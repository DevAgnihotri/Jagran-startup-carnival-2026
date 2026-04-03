"use client";

import { useEffect, useState } from "react";

type MePayload = {
  user: { id: string; email: string | null } | null;
  slug: string | null;
};

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<MePayload>({ user: null, slug: null });

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const payload = (await res.json()) as MePayload;
      setData(payload);
    };

    load();
  }, []);

  if (!data.user) {
    return (
      <a
        href="/auth/login?next=/dashboard"
        className="font-grotesk text-[11px] font-bold text-[#0A0A0A] bg-[#FFD600] tracking-[1.5px] px-[18px] py-[9px] hover:bg-[#F5F5F0] transition-colors"
      >
        REGISTER NOW
      </a>
    );
  }

  const initials = (data.user.email || "U").slice(0, 1).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center border border-[#333] bg-[#111] font-ibm-mono text-[11px] text-[#F5F5F0]"
      >
        {initials}
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-48 border border-[#2D2D2D] bg-[#0D0D0D] p-1">
          <a className="block px-3 py-2 font-ibm-mono text-[11px] text-[#E2E2DB] hover:bg-[#161616]" href="/dashboard">
            Dashboard
          </a>
          {data.slug ? (
            <a className="block px-3 py-2 font-ibm-mono text-[11px] text-[#E2E2DB] hover:bg-[#161616]" href={`/${data.slug}`}>
              Your Page
            </a>
          ) : null}
          <a
            href="/auth/logout"
            className="block w-full px-3 py-2 text-left font-ibm-mono text-[11px] text-[#FF6B35] hover:bg-[#161616]"
          >
            Logout
          </a>
        </div>
      ) : null}
    </div>
  );
}
