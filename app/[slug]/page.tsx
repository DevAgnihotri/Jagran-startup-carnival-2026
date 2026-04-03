import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function StallPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("stall_profiles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  const videos = Array.isArray(profile.video_links) ? profile.video_links : [];

  function getYouTubeId(url: string) {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/i);
    return m ? m[1] : null;
  }

  const background = profile.background_gradient
    ? profile.background_gradient
    : `radial-gradient(circle at 15% 20%, ${profile.background_color || "#121212"} 0%, #090909 45%, #050505 100%)`;

  return (
    <main
      style={{ background }}
      className="relative min-h-screen overflow-hidden px-6 py-12 text-[#F7F7F3] md:px-12"
    >
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#FFD600]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-24 h-80 w-80 rounded-full bg-[#4BE3FF]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D]/75 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="relative h-64 w-full md:h-80">
          {profile.banner_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.banner_url} alt="Banner" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(120deg,#1A1A1A_0%,#2A2A2A_35%,#161616_100%)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.75))]" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 md:left-10 md:right-10">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-xl border border-white/20 bg-black/40 shadow-xl md:h-24 md:w-24">
                {profile.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.logo_url} alt="Logo" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div>
                <h1 className="font-grotesk text-3xl font-bold leading-tight md:text-5xl">{profile.stall_name}</h1>
                {profile.tagline ? (
                  <p className="mt-2 font-ibm-mono text-[11px] uppercase tracking-[2px] text-[#E6E6DF]">{profile.tagline}</p>
                ) : null}
              </div>
            </div>

            <div className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 font-ibm-mono text-[11px] tracking-[1px] text-[#FFD600]">
              /{profile.slug}
            </div>
          </div>
        </div>

        <div className="px-6 pb-12 pt-8 md:px-12">
          <div className="space-y-10">
            {profile.about ? (
              <section>
                <h2 className="font-ibm-mono text-[11px] uppercase tracking-[2px] text-[#A9A9A2]">About</h2>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-5">
                  <div className="prose prose-invert max-w-none font-ibm-mono text-[14px] leading-8 text-[#D8D8D1] prose-headings:font-grotesk prose-headings:text-[#F6F6F2] prose-a:text-[#FFD600] prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-xl">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ ...props }) => <h1 {...props} className="mb-4 mt-2 font-grotesk text-4xl font-bold leading-tight text-[#F6F6F2]" />,
                        h2: ({ ...props }) => <h2 {...props} className="mb-3 mt-2 font-grotesk text-3xl font-bold leading-tight text-[#F3F3EE]" />,
                        h3: ({ ...props }) => <h3 {...props} className="mb-3 mt-2 font-grotesk text-2xl font-semibold leading-tight text-[#EFEFEA]" />,
                        a: ({ ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
                        img: ({ ...props }) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img {...props} alt={props.alt || "Markdown image"} className="mx-auto my-4 max-h-110 w-auto rounded-xl border border-white/10 object-contain" />
                        ),
                      }}
                    >
                      {profile.about}
                    </ReactMarkdown>
                  </div>
                </div>
              </section>
            ) : null}

            {videos.length > 0 ? (
              <section className="mx-auto w-full max-w-4xl">
                <h2 className="text-center font-ibm-mono text-[11px] uppercase tracking-[2px] text-[#A9A9A2]">Featured Videos</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-1">
                  {videos.map((video: string) => {
                    const id = getYouTubeId(video);
                    if (id) {
                      return (
                        <div key={video} className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                          <iframe
                            src={`https://www.youtube.com/embed/${id}`}
                            title={`youtube-${id}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="h-full w-full border-0"
                          />
                          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 transition group-hover:ring-[#FFD600]/40" />
                        </div>
                      );
                    }

                    return (
                      <a
                        key={video}
                        href={video}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-ibm-mono text-[12px] text-[#FFD600] underline decoration-[#FFD600]/40 underline-offset-4"
                      >
                        {video}
                      </a>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <section className="mt-2 rounded-xl border border-white/10 bg-black/25 p-5">
              <h3 className="font-ibm-mono text-[11px] uppercase tracking-[2px] text-[#A9A9A2]">Connect</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {profile.contact_email ? (
                  <a href={`mailto:${profile.contact_email}`} className="block font-ibm-mono text-[12px] text-[#F5F5F0] hover:text-[#FFD600]">
                    {profile.contact_email}
                  </a>
                ) : null}
                {profile.website_url ? (
                  <a href={profile.website_url} target="_blank" rel="noreferrer" className="block font-ibm-mono text-[12px] text-[#F5F5F0] hover:text-[#FFD600]">
                    Website
                  </a>
                ) : null}
                {profile.instagram_url ? (
                  <a href={profile.instagram_url} target="_blank" rel="noreferrer" className="block font-ibm-mono text-[12px] text-[#F5F5F0] hover:text-[#FFD600]">
                    Instagram
                  </a>
                ) : null}
                {profile.linkedin_url ? (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="block font-ibm-mono text-[12px] text-[#F5F5F0] hover:text-[#FFD600]">
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
