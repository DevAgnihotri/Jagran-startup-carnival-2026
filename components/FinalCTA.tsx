"use client";

import GlitchText from "@/components/GlitchText";

export default function FinalCTA() {
  const jimWebsiteUrl = "https://jimkanpur.ac.in/";

  return (
    <section className="flex flex-col items-center w-full bg-[#0A0A0A] py-16 px-5 sm:px-8 lg:px-16 xl:p-[120px] gap-10 lg:gap-[48px] border-t-2 border-t-[#FFD600]">
      {/* Badge */}
      <div className="flex items-center justify-center gap-[8px] h-[32px] px-[16px] bg-[#1A1A1A] border-2 border-[#FFD600]">
        <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">
          <GlitchText text="[READY TO JOIN?]" speed={30} />
        </span>
      </div>

      {/* Title */}
      <h2 className="font-grotesk text-[38px] md:text-[80px] font-bold text-[#F5F5F0] tracking-[-1.5px] md:tracking-[-2px] leading-none text-center w-full max-w-[1000px] whitespace-pre-line">
        <GlitchText text={"BRING YOUR IDEA.\nOWN THE STAGE."} speed={40} delay={200} />
      </h2>

      {/* Subtitle */}
      <p className="font-ibm-mono text-[10px] md:text-[14px] text-[#666666] tracking-[0.5px] md:tracking-[2px] text-center text-pretty w-full max-w-[700px] px-2">
        <GlitchText text="JOIN JAGRAN CARNIVAL 2026 AND TURN YOUR STARTUP MOMENTUM INTO REAL OPPORTUNITY." speed={20} delay={450} />
      </p>

      {/* CTA */}
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <a
          href={jimWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full sm:w-[300px] h-[64px] bg-[#FFD600] hover:bg-[#e6c200] transition-colors"
        >
          <span className="font-grotesk text-[13px] font-bold text-[#0A0A0A] tracking-[2px]">
            GO TO JIM WEBSITE
          </span>
        </a>
        <a
          href={jimWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px] hover:underline"
        >
          JIM LOGO LINK
        </a>
      </div>
    </section>
  );
}
