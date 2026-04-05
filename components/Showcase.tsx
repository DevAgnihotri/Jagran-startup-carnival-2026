"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

type StallSlide = {
  slug: string;
  stall_name: string;
  tagline: string | null;
  banner_url: string | null;
};

export default function Showcase() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<StallSlide[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/stall/list", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && Array.isArray(json?.stalls)) {
          setSlides(json.stalls);
          setActive(0);
        }
      } catch {
        if (!cancelled) setSlides([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setActive((current) => Math.max(0, Math.min(current, Math.max(slides.length - 1, 0))));
  }, [slides.length]);

  const prev = () => setActive((p) => Math.max(0, p - 1));
  const next = () => setActive((p) => Math.min(Math.max(slides.length - 1, 0), p + 1));

  const slide = useMemo(() => slides[active], [slides, active]);
  const total = slides.length;

  return (
      <section id="showcase" className="flex flex-col w-full bg-[#080808] pt-16 lg:pt-[100px] pb-0 gap-8 lg:gap-[48px]">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between px-5 sm:px-8 lg:px-16 xl:px-[120px]">
        <SectionHeader
          label="[07] // REGISTERED STALLS"
          title={"INSIDE THE\nCARNIVAL."}
          titleWidth="w-full max-w-[600px]"
        />
        <div className="flex items-center gap-[8px] shrink-0 self-start sm:self-auto">
          <button
            onClick={prev}
            disabled={total <= 1}
            className="flex items-center justify-center w-[48px] h-[48px] bg-[#111111] border-2 border-[#3D3D3D] hover:border-[#888888] transition-colors"
          >
            <span className="font-grotesk text-[18px] font-bold text-[#888888]">&lt;</span>
          </button>
          <button
            onClick={next}
            disabled={total <= 1}
            className="flex items-center justify-center w-[48px] h-[48px] bg-[#FFD600] hover:bg-[#e6c200] transition-colors"
          >
            <span className="font-grotesk text-[18px] font-bold text-[#0A0A0A]">&gt;</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="px-5 sm:px-8 lg:px-16 xl:px-[120px] pb-16">
          <div className="border border-[#2D2D2D] bg-[#101010] p-6 font-ibm-mono text-[12px] text-[#9A9A93] tracking-[1px]">
            LOADING REGISTERED STALLS FROM DATABASE...
          </div>
        </div>
      ) : total === 0 ? (
        <div className="px-5 sm:px-8 lg:px-16 xl:px-[120px] pb-16">
          <div className="border border-[#2D2D2D] bg-[#101010] p-6 font-ibm-mono text-[12px] text-[#9A9A93] tracking-[1px]">
            NO REGISTERED STALLS FOUND IN SUPABASE YET.
          </div>
        </div>
      ) : (
        <>

      {/* Mobile: single card */}
      <div className="lg:hidden px-5 sm:px-8">
        <div
          className="flex flex-col gap-5 p-6 border-2 w-full transition-all duration-200 hover:brightness-110 hover:saturate-125"
          style={{ backgroundColor: "#111111", borderColor: "#2D2D2D" }}
        >
          <Link href={`/${slide?.slug || ""}`} className="block">
            <div className="flex items-center justify-center h-[160px] bg-[#1A1A1A] border border-[#2D2D2D] overflow-hidden cursor-pointer">
              {slide?.banner_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.banner_url} alt={slide.stall_name} className="h-full w-full object-cover" />
              ) : (
                <span className="font-ibm-mono text-[11px] text-[#333333] tracking-[2px]">[NO BANNER UPLOADED]</span>
              )}
            </div>
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center h-[24px] px-[10px] border bg-[#FFD600] border-transparent">
              <span className="font-ibm-mono text-[9px] font-bold tracking-[1px] text-[#0A0A0A]">
                [REGISTERED STALL]
              </span>
            </div>
            <span className="font-ibm-mono text-[11px] tracking-[2px] text-[#FFD600]">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0] tracking-[1px] leading-[1.2] whitespace-pre-line">
            {slide?.stall_name || "UNTITLED STALL"}
          </h3>
          <p className="font-ibm-mono text-[11px] text-[#555555] tracking-[1px]">{slide?.tagline || "NO TAGLINE ADDED YET"}</p>
        </div>
      </div>

      {/* Desktop: carousel track */}
      <div className="hidden lg:block overflow-hidden h-[416px] px-16 xl:px-[120px]">
        <div
          className="flex gap-[2px] transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${active} * (560px + 2px)))` }}
        >
        {slides.map((s, i) => (
          <div
            key={s.slug}
            className="flex flex-col gap-[24px] p-[40px] h-[412px] w-[560px] shrink-0 border-2 transition-all duration-200 hover:brightness-110 hover:saturate-125"
            style={{ backgroundColor: "#111111", borderColor: "#2D2D2D" }}
          >
            <Link href={`/${s.slug}`} className="block">
              <div className="flex items-center justify-center h-[200px] bg-[#1A1A1A] border border-[#2D2D2D] overflow-hidden cursor-pointer">
                {s.banner_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.banner_url} alt={s.stall_name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-ibm-mono text-[11px] text-[#333333] tracking-[2px]">[NO BANNER UPLOADED]</span>
                )}
              </div>
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-center h-[24px] px-[10px] border bg-[#FFD600] border-transparent">
                <span className="font-ibm-mono text-[9px] font-bold tracking-[1px] text-[#0A0A0A]">
                  [REGISTERED STALL]
                </span>
              </div>
              <span className="font-ibm-mono text-[11px] tracking-[2px] text-[#FFD600]">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0] tracking-[1px] leading-[1.2] whitespace-pre-line">
              {s.stall_name}
            </h3>
            <p className="font-ibm-mono text-[11px] text-[#555555] tracking-[1px]">{s.tagline || "NO TAGLINE ADDED YET"}</p>
          </div>
        ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-[8px] px-5 sm:px-8 lg:px-16 xl:px-[120px]">
        {slides.map((s, i) => (
          <button
            key={`${s.slug}-dot`}
            onClick={() => setActive(i)}
            className="h-[4px] transition-all hover:opacity-80"
            style={{ width: i === active ? 32 : 8, backgroundColor: i === active ? "#FFD600" : "#333333" }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 sm:px-8 lg:px-16 xl:px-[120px] pb-16 lg:pb-[100px]">
        <span className="font-ibm-mono text-[10px] sm:text-[11px] text-[#444444] tracking-[1.2px] sm:tracking-[2px]">
          SHOWING {String(active + 1).padStart(2, "0")} OF {String(total).padStart(2, "0")} REGISTERED STALLS
        </span>
        {slide ? (
          <a href={`/${slide.slug}`} className="font-ibm-mono text-[10px] sm:text-[11px] text-[#FFD600] tracking-[1.2px] sm:tracking-[2px] hover:underline">
            VIEW ALL OTHER STALLS &gt;
          </a>
        ) : null}
      </div>
      </>
      )}
    </section>
  );
}
