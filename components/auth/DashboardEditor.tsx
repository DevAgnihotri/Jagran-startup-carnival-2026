"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type StallProfile = {
  slug: string;
  stall_name: string;
  tagline: string | null;
  about: string | null;
  banner_url: string | null;
  logo_url: string | null;
  video_links: string[];
  background_color?: string | null;
  background_gradient?: string | null;
  contact_email: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  is_published: boolean;
};

const emptyProfile: StallProfile = {
  slug: "",
  stall_name: "",
  tagline: "",
  about: "",
  banner_url: "",
  logo_url: "",
  video_links: [],
  contact_email: "",
  instagram_url: "",
  linkedin_url: "",
  website_url: "",
  background_color: "",
  background_gradient: "",
  is_published: true,
};

export default function DashboardEditor() {
  const [profile, setProfile] = useState<StallProfile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [gradientMode, setGradientMode] = useState<"solid" | "gradient">("solid");
  const [gradientFrom, setGradientFrom] = useState("#1A1A1A");
  const [gradientTo, setGradientTo] = useState("#090909");

  const videoLinksText = useMemo(() => profile.video_links.join(", "), [profile.video_links]);
  const pageUrlPreview = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (!profile.slug) return origin ? `${origin}/your-page-name` : "/your-page-name";
    return origin ? `${origin}/${profile.slug}` : `/${profile.slug}`;
  }, [profile.slug]);

  useEffect(() => {
    const load = async () => {
      const getRes = await fetch("/api/stall/me", { cache: "no-store" });
      if (getRes.status === 404) {
        await fetch("/api/stall/me", { method: "POST" });
      }

      const finalRes = await fetch("/api/stall/me", { cache: "no-store" });
      const data = await finalRes.json();
      if (data.profile) {
        const merged = { ...emptyProfile, ...data.profile };
        setProfile(merged);
        if (merged.background_gradient && /linear-gradient\((.+)\)/i.test(merged.background_gradient)) {
          setGradientMode("gradient");
          const colors = merged.background_gradient.match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
          if (colors?.[0]) setGradientFrom(colors[0]);
          if (colors?.[1]) setGradientTo(colors[1]);
        }
      }
      setLoading(false);
    };

    load();
  }, []);

  const updateField = (key: keyof StallProfile, value: string | boolean | string[]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const updateSlug = (value: string) => {
    const normalized = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    updateField("slug", normalized);
  };

  const saveProfile = async () => {
    setSaving(true);
    setStatus("");
    // Build payload and strip empty/null values to satisfy server validation.
    const backgroundGradient =
      gradientMode === "gradient"
        ? `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
        : undefined;

    const payloadRaw = {
      ...profile,
      video_links: profile.video_links.filter(Boolean),
      background_color: profile.background_color || undefined,
      background_gradient: backgroundGradient,
    } as Record<string, any>;

    const payload = Object.fromEntries(
      Object.entries(payloadRaw).filter(([k, v]) => {
        // keep arrays (video_links) and booleans (is_published)
        if (k === "video_links" || k === "is_published") return true;
        // drop empty strings, nulls and undefined
        return v !== "" && v !== null && v !== undefined;
      })
    );

    const res = await fetch("/api/stall/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      // try to surface the server error for easier debugging
      try {
        const json = await res.json();
        if (json?.error) {
          const message = typeof json.error === "string" ? json.error : JSON.stringify(json.error);
          setStatus(message);
          return;
        }
      } catch (e) {
        // ignore parse errors
      }

      setStatus("Save failed. Check values and try again.");
      return;
    }

    setStatus("Saved successfully.");
  };

  if (loading) {
    return <p className="font-ibm-mono text-[12px] text-[#A0A09A]">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Stall Name" value={profile.stall_name} onChange={(v) => updateField("stall_name", v)} />
        <Field label="Tagline" value={profile.tagline || ""} onChange={(v) => updateField("tagline", v)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Field
          label="Page Username"
          value={profile.slug}
          onChange={updateSlug}
        />
        <div className="grid gap-2">
          <span className="font-ibm-mono text-[11px] tracking-[1px] text-[#A0A09A]">Public URL preview</span>
          <div className="flex h-11 items-center border border-[#2A2A2A] bg-[#111] px-3 font-ibm-mono text-[12px] text-[#FFD600]">
            {pageUrlPreview}
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        <MarkdownEditor
          label="Description (rich text with markdown)"
          value={profile.about || ""}
          onChange={(v) => updateField("about", v)}
          rows={8}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Banner Image URL" value={profile.banner_url || ""} onChange={(v) => updateField("banner_url", v)} />
        <Field label="Logo URL" value={profile.logo_url || ""} onChange={(v) => updateField("logo_url", v)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ColorField
          label="Background color"
          value={profile.background_color || ""}
          onChange={(v: string) => updateField("background_color", v)}
        />
        <GradientField
          mode={gradientMode}
          onModeChange={setGradientMode}
          from={gradientFrom}
          to={gradientTo}
          onFromChange={setGradientFrom}
          onToChange={setGradientTo}
        />
      </section>

      <section className="grid gap-4">
        <TextArea
          label="Video Links (comma-separated)"
          value={videoLinksText}
          onChange={(v) => updateField("video_links", v.split(",").map((line) => line.trim()).filter(Boolean))}
          rows={4}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Contact Email" value={profile.contact_email || ""} onChange={(v) => updateField("contact_email", v)} />
        <Field label="Website URL" value={profile.website_url || ""} onChange={(v) => updateField("website_url", v)} />
        <Field label="Instagram URL" value={profile.instagram_url || ""} onChange={(v) => updateField("instagram_url", v)} />
        <Field label="LinkedIn URL" value={profile.linkedin_url || ""} onChange={(v) => updateField("linkedin_url", v)} />
      </section>

      <section className="flex items-center justify-between border border-[#202020] bg-[#0C0C0C] p-4">
        <label className="font-ibm-mono text-[11px] tracking-[1px] text-[#CFCFC8]">
          Publicly visible
          <input
            className="ml-3 accent-[#FFD600]"
            type="checkbox"
            checked={profile.is_published}
            onChange={(e) => updateField("is_published", e.target.checked)}
          />
        </label>

        <a
          href={`/${profile.slug}`}
          target="_blank"
          rel="noreferrer"
          className="font-ibm-mono text-[11px] tracking-[1px] text-[#FFD600]"
        >
          View Your Page
        </a>
      </section>

      <div className="flex items-center gap-4">
        <button
          disabled={saving}
          onClick={saveProfile}
          className="h-11 bg-[#FFD600] px-6 font-ibm-mono text-[11px] font-bold tracking-[2px] text-[#0A0A0A] disabled:opacity-60"
        >
          {saving ? "SAVING..." : "SAVE CHANGES"}
        </button>
        <p className="font-ibm-mono text-[11px] text-[#8A8A85]">{status}</p>
      </div>
    </div>
  );
}

function MarkdownEditor({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  const [preview, setPreview] = useState(false);

  const applyWrap = (left: string, right = left) => {
    // Basic markdown helper insertion at cursor/selection.
    const el = document.getElementById("about-editor") as HTMLTextAreaElement | null;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    const next = `${value.slice(0, start)}${left}${selected}${right}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + left.length + selected.length + right.length;
      el.setSelectionRange(pos, pos);
    });
  };

  return (
    <label className="grid gap-2">
      <span className="font-ibm-mono text-[11px] tracking-[1px] text-[#A0A09A]">{label}</span>
      <div className="flex flex-wrap gap-2 border border-[#2A2A2A] bg-[#111] p-2">
        <button type="button" onClick={() => applyWrap("**")} className="h-8 border border-[#2A2A2A] px-3 font-ibm-mono text-[11px] text-[#E6E6E0]">Bold</button>
        <button type="button" onClick={() => applyWrap("*")} className="h-8 border border-[#2A2A2A] px-3 font-ibm-mono text-[11px] text-[#E6E6E0]">Italic</button>
        <button type="button" onClick={() => applyWrap("[", "](https://)")} className="h-8 border border-[#2A2A2A] px-3 font-ibm-mono text-[11px] text-[#E6E6E0]">Link</button>
        <button type="button" onClick={() => onChange(`# ${value}`)} className="h-8 border border-[#2A2A2A] px-3 font-ibm-mono text-[11px] text-[#E6E6E0]">H1</button>
        <button type="button" onClick={() => setPreview((p) => !p)} className="h-8 border border-[#FFD600]/50 px-3 font-ibm-mono text-[11px] text-[#FFD600]">{preview ? "Edit" : "Preview"}</button>
      </div>
      {preview ? (
        <div className="min-h-45 border border-[#2A2A2A] bg-[#111] px-3 py-2">
          <div className="prose prose-invert max-w-none font-ibm-mono text-[13px] leading-7 text-[#F5F5F0] prose-headings:font-grotesk prose-a:text-[#FFD600] prose-img:rounded-lg">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <h1 {...props} className="mb-3 mt-2 font-grotesk text-3xl font-bold leading-tight text-[#F7F7F3]" />,
                h2: ({ ...props }) => <h2 {...props} className="mb-3 mt-2 font-grotesk text-2xl font-semibold leading-tight text-[#F4F4EF]" />,
                h3: ({ ...props }) => <h3 {...props} className="mb-2 mt-2 font-grotesk text-xl font-semibold leading-tight text-[#F0F0EA]" />,
                a: ({ ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
                img: ({ ...props }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img {...props} alt={props.alt || "Markdown image"} className="my-3 max-h-70 w-auto rounded-lg border border-[#2A2A2A] object-contain" />
                ),
              }}
            >
              {value}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <textarea
          id="about-editor"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#2A2A2A] bg-[#111] px-3 py-2 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none focus:border-[#FFD600]"
        />
      )}
    </label>
  );
}

function GradientField({
  mode,
  onModeChange,
  from,
  to,
  onFromChange,
  onToChange,
}: {
  mode: "solid" | "gradient";
  onModeChange: (m: "solid" | "gradient") => void;
  from: string;
  to: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-ibm-mono text-[11px] tracking-[1px] text-[#A0A09A]">Background mode</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onModeChange("solid")}
          className={`h-10 border px-3 font-ibm-mono text-[11px] ${mode === "solid" ? "border-[#FFD600] text-[#FFD600]" : "border-[#2A2A2A] text-[#E6E6E0]"}`}
        >
          Solid
        </button>
        <button
          type="button"
          onClick={() => onModeChange("gradient")}
          className={`h-10 border px-3 font-ibm-mono text-[11px] ${mode === "gradient" ? "border-[#FFD600] text-[#FFD600]" : "border-[#2A2A2A] text-[#E6E6E0]"}`}
        >
          Gradient
        </button>
      </div>
      {mode === "gradient" ? (
        <div className="grid gap-2">
          <div className="flex items-center gap-3">
            <input type="color" value={from} onChange={(e) => onFromChange(e.target.value)} className="h-10 w-10 border border-[#2A2A2A]" />
            <input type="color" value={to} onChange={(e) => onToChange(e.target.value)} className="h-10 w-10 border border-[#2A2A2A]" />
            <div style={{ background: `linear-gradient(135deg, ${from}, ${to})` }} className="h-10 flex-1 border border-[#2A2A2A]" />
          </div>
          <p className="font-ibm-mono text-[11px] text-[#8A8A85]">Gradient will be used as your page background.</p>
        </div>
      ) : null}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-ibm-mono text-[11px] tracking-[1px] text-[#A0A09A]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border border-[#2A2A2A] bg-[#111] px-3 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none focus:border-[#FFD600]"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-ibm-mono text-[11px] tracking-[1px] text-[#A0A09A]">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#2A2A2A] bg-[#111] px-3 py-2 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none focus:border-[#FFD600]"
      />
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-ibm-mono text-[11px] tracking-[1px] text-[#A0A09A]">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value || "#0f0f0f"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 appearance-none rounded border border-[#2A2A2A] p-0"
        />
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#0F0F0F"
          className="h-11 border border-[#2A2A2A] bg-[#111] px-3 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none focus:border-[#FFD600]"
        />
      </div>
    </label>
  );
}
