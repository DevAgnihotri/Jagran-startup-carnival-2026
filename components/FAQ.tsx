"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

const faqs = [
  {
    question: "WHO CAN REGISTER FOR A STALL?",
    answer:
      "STARTUPS, BRANDS, INFLUENCERS, OPEN-SOURCE PROJECTS, STUDENT VENTURES, AND EARLY-AGE FOUNDERS CAN REGISTER FOR THE EXPO STALL TRACK.",
    defaultOpen: true,
  },
  { question: "WHAT IS THE LAST DATE FOR STALL REGISTRATION?", answer: "THE LAST DATE FOR STALL REGISTRATION SUBMISSION IS 15 APRIL 2026." },
  { question: "WHAT IS INCLUDED IN RS. 2,500 STALL FEE?", answer: "THE FEE COVERS STALL SPACE, BRAND VISIBILITY, SPOC SUPPORT, STARTUP STORY SHOWCASE, FEEDBACK INTERACTIONS, FELICITATION, AND COMPLIMENTARY LUNCH FOR 2 MEMBERS." },
  { question: "WHO CAN PARTICIPATE IN JAGRANPRENEURS PITCH?", answer: "BUDDING STUDENT ENTREPRENEURS, ALUMNI FOUNDERS, AND NEW STARTUPS WITH BUSINESS IDEAS CAN PARTICIPATE IN THE DAY 2 PITCH TRACK." },
  { question: "CAN ALUMNI OR PROFESSIONALS JOIN AS PANELISTS?", answer: "YES. YOU CAN REGISTER UNDER THE AUDIENCE / ALUMNI / PANEL FLOW TO JOIN TALKS AND INSPIRE THE NEXT GENERATION." },
  { question: "HOW WILL CONFIRMATION BE SHARED?", answer: "AFTER FORM REVIEW, THE ORGANIZING TEAM WILL SHARE PARTICIPATION CONFIRMATION THROUGH REGISTERED EMAIL OR CONTACT NUMBER." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="flex flex-col w-full bg-[#060606] py-16 px-5 sm:px-8 lg:py-[100px] lg:px-16 xl:px-[120px]">
      <div className="w-full max-w-[480px]">
        <SectionHeader
          label="[08] // FAQ"
          title={"GOT\nQUESTIONS?"}
          subtitle="EVERYTHING YOU NEED TO KNOW BEFORE JOINING JAGRAN CARNIVAL 2026."
          titleWidth="w-full"
          subtitleWidth="w-full"
        />
      </div>

      <div className="h-10 md:h-[64px]" />

      {/* FAQ items */}
      <div className="flex flex-col w-full">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="flex flex-col w-full border-t border-t-[#1D1D1D]">
              <button
                className="flex items-center justify-between w-full py-5 md:h-[72px] text-left gap-4"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span className="font-grotesk text-[13px] md:text-[16px] font-bold text-[#F5F5F0] tracking-[0.8px] md:tracking-[1px]">
                  {faq.question}
                </span>
                <div
                  className="flex items-center justify-center w-[32px] h-[32px] shrink-0"
                  style={{ backgroundColor: isOpen ? "#FFD600" : "#1A1A1A", border: isOpen ? "none" : "1px solid #3D3D3D" }}
                >
                  <span
                    className="font-ibm-mono text-[14px] font-bold"
                    style={{ color: isOpen ? "#0A0A0A" : "#888888" }}
                  >
                    {isOpen ? "—" : "+"}
                  </span>
                </div>
              </button>
              {isOpen && faq.answer && (
                <div className="pb-8">
                  <p className="font-ibm-mono text-[12px] md:text-[13px] text-[#888888] tracking-[1px] leading-[1.6]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div className="border-t border-t-[#1D1D1D]" />
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-[16px] pt-10 md:pt-[48px]">
        <span className="font-ibm-mono text-[13px] text-[#555555] tracking-[1px]">
          STILL HAVE QUESTIONS?
        </span>
        <a
          href="https://forms.gle/9CphHDinuvNBFwTXA"
          target="_blank"
          rel="noopener noreferrer"
          className="font-ibm-mono text-[13px] font-bold text-[#FFD600] tracking-[1px] cursor-pointer hover:underline"
        >
          CONTACT ORGANIZING TEAM &gt;
        </a>
      </div>
    </section>
  );
}
