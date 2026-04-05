import SectionHeader from "./SectionHeader";

export default function Bento() {
  return (
    <section className="flex flex-col w-full bg-[#0D0D0D] py-16 px-5 sm:px-8 lg:py-[100px] lg:px-16 xl:px-[120px] gap-10 lg:gap-[48px]">
      <SectionHeader
        label="[05] // CARNIVAL VALUE"
        title={"WHAT YOU GAIN.\nAT THE CONCLAVE."}
        titleWidth="w-full max-w-[800px]"
      />

      <div className="flex flex-col w-full gap-[2px]">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row w-full gap-[2px]">
          {/* Bento A — Yellow */}
          <div className="group flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-[#FFD600] w-full md:flex-1 transition-colors duration-200 hover:bg-[#FFD600]">
            <span className="font-ibm-mono text-[11px] font-bold text-[#1A1A1A] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[01]</span>
            <h3 className="font-grotesk text-[24px] md:text-[28px] font-bold text-[#0A0A0A] tracking-[-1px] leading-[1.1] whitespace-pre-line transition-colors duration-200 group-hover:text-[#0A0A0A]">
              {"NETWORKING\nAT SCALE"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#1A1A1A] tracking-[1px] leading-[1.6] transition-colors duration-200 group-hover:text-[#0A0A0A]">
              MEET ENTREPRENEURS, ALUMNI, POLICY STAKEHOLDERS, AND INDUSTRY LEADERS ACROSS TWO HIGH-IMPACT DAYS.
            </p>
            <div className="flex items-center justify-center h-[28px] px-[12px] bg-[#0A0A0A] border border-[#0A0A0A] w-fit transition-colors duration-200 group-hover:bg-[#FFF2A8] group-hover:border-[#0A0A0A]">
              <span className="font-ibm-mono text-[10px] font-bold text-[#FFD600] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[LIVE]</span>
            </div>
          </div>

          {/* Bento B */}
          <div className="group flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-[#111111] border border-[#2D2D2D] w-full md:flex-1 transition-colors duration-200 hover:bg-[#FFD600]">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[02]</span>
            <h3 className="font-grotesk text-[24px] md:text-[28px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line transition-colors duration-200 group-hover:text-[#0A0A0A]">
              {"BRAND\nVISIBILITY"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#666666] tracking-[1px] leading-[1.6] transition-colors duration-200 group-hover:text-[#0A0A0A]">
              GAIN VISIBILITY THROUGH STARTUP EXPO, IDEA PITCHING, PANEL STAGES, AND COMMUNITY SHOWCASE MOMENTS.
            </p>
          </div>

          {/* Bento C */}
          <div className="group flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-[#0A0A0A] border border-[#2D2D2D] w-full md:flex-1 transition-colors duration-200 hover:bg-[#FF3B30]">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[03]</span>
            <h3 className="font-grotesk text-[24px] md:text-[28px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line transition-colors duration-200 group-hover:text-[#0A0A0A]">
              {"DIRECT\nFEEDBACK"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#666666] tracking-[1px] leading-[1.6] transition-colors duration-200 group-hover:text-[#0A0A0A]">
              GET FEEDBACK ON PRODUCT, POSITIONING, COMPLIANCE, FUNDING READINESS, AND EXECUTION STRATEGY.
            </p>
            <div className="flex items-center justify-center h-[28px] px-[12px] bg-[#1A1A1A] border border-[#FF6B35] w-fit transition-colors duration-200 group-hover:bg-[#FFF2A8] group-hover:border-[#0A0A0A]">
              <span className="font-ibm-mono text-[10px] font-bold text-[#FF6B35] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[INSIGHT]</span>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row w-full gap-[2px]">
          {/* Bento D */}
          <div className="group flex flex-col gap-5 p-8 md:p-[40px] md:h-[260px] bg-[#111111] border border-[#2D2D2D] w-full md:flex-1 transition-colors duration-200 hover:bg-[#FFD600]">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[04]</span>
            <h3 className="font-grotesk text-[24px] md:text-[28px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line transition-colors duration-200 group-hover:text-[#0A0A0A]">
              {"MENTOR\nINTERACTIONS"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#666666] tracking-[1px] leading-[1.6] transition-colors duration-200 group-hover:text-[#0A0A0A]">
              ACCESS ONE-TO-ONE GUIDANCE FROM MENTORS, INCUBATION SUPPORT LEADS, AND DOMAIN EXPERTS.
            </p>
          </div>

          {/* Bento E */}
          <div className="group flex flex-col gap-5 p-8 md:p-[40px] md:h-[260px] bg-[#0F0F0F] border-2 border-[#FF6B35] w-full md:flex-1 transition-colors duration-200 hover:bg-[#FF3B30]">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FF6B35] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[05]</span>
            <h3 className="font-grotesk text-[24px] md:text-[28px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line transition-colors duration-200 group-hover:text-[#0A0A0A]">
              {"PANEL\nDISCUSSIONS"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#666666] tracking-[1px] leading-[1.6] transition-colors duration-200 group-hover:text-[#0A0A0A]">
              ATTEND SESSIONS ON LEADERPRENEURSHIP, NEP IN LEADERSHIP, INVESTMENT PLANNING, AND ENTREPRENEURIAL PHILANTHROPY.
            </p>
            <div className="flex items-center justify-center h-[28px] px-[12px] bg-[#1A1A1A] border border-[#FF6B35] w-fit transition-colors duration-200 group-hover:bg-[#FFF2A8] group-hover:border-[#0A0A0A]">
              <span className="font-ibm-mono text-[10px] font-bold text-[#FF6B35] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[STAGE]</span>
            </div>
          </div>

          {/* Bento F */}
          <div className="group flex flex-col gap-5 p-8 md:p-[40px] md:h-[260px] bg-[#0A0A0A] border border-[#2D2D2D] w-full md:flex-1 transition-colors duration-200 hover:bg-[#FFD600]">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">[06]</span>
            <h3 className="font-grotesk text-[24px] md:text-[28px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line transition-colors duration-200 group-hover:text-[#0A0A0A]">
              {"RECOGNITION\n& CROWN"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#666666] tracking-[1px] leading-[1.6] transition-colors duration-200 group-hover:text-[#0A0A0A]">
              RECEIVE CERTIFICATION, PRIZE OPPORTUNITIES, FELICITATION, AND LONG-TERM NETWORKING PATHWAYS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
