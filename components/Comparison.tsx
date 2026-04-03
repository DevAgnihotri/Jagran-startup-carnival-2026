import SectionHeader from "./SectionHeader";

const rows = [
  { feature: "09:00", pc: "DESK OPEN + CHECK-IN", figma: "PARTICIPANT REPORTING", sketch: "DELEGATE ENTRY", framer: "INFO HELPDESK" },
  { feature: "10:30", pc: "EXPO FLOOR LIVE", figma: "PITCH ROUND 1", sketch: "AUDIENCE INTERACTION", framer: "NETWORK ZONE OPEN" },
  { feature: "12:30", pc: "STALL VISITS", figma: "JURY HUDDLE", sketch: "ALUMNI MEETUP", framer: "Q&A BLOCK" },
  { feature: "02:00", pc: "MENTOR INTERACTIONS", figma: "PANEL DISCUSSION", sketch: "DELEGATE TALKS", framer: "STORY SPOTLIGHT" },
  { feature: "03:30", pc: "PRODUCT DEMOS", figma: "FINAL PITCH ROUND", sketch: "NETWORKING CIRCUITS", framer: "EXPERT FEEDBACK" },
  { feature: "05:00", pc: "EXHIBITOR FELICITATION", figma: "CROWN CEREMONY", sketch: "CLOSING NOTES", framer: "PHOTO MOMENT" },
];

function cellStyle(val: string) {
  if (val.includes("CROWN") || val.includes("LIVE")) return "font-bold text-[12px]";
  return "text-[11px]";
}

function cellColor(val: string) {
  if (val.includes("CROWN") || val.includes("LIVE")) return "text-[#FFD600]";
  return "";
}

export default function Comparison() {
  return (
    <section id="comparison" className="flex flex-col w-full bg-[#050505] py-16 px-6 md:py-[100px] md:px-[120px] gap-12 md:gap-[64px]">
      <SectionHeader
        label="[06] // TIMETABLE"
        title={"TWO DAYS.\nONE CARNIVAL."}
        subtitle="THE COMPLETE FLOW, HOUR BY HOUR, ACROSS EXPO, PITCH, AND DELEGATE MOMENTS."
      />

      {/* Desktop table */}
      <div className="hidden md:flex flex-col w-full border border-[#2D2D2D]">
        {/* Header */}
        <div className="flex w-full h-[56px] bg-[#111111] border-b-2 border-b-[#FFD600]">
          <div className="flex items-center w-[400px] shrink-0 px-[32px] border-r border-r-[#2D2D2D]">
            <span className="font-grotesk text-[11px] font-bold text-[#888888] tracking-[2px]">TIME SLOT</span>
          </div>
          <div className="flex items-center flex-1 px-[32px] bg-[#1A1A1A] border-r border-r-[#2D2D2D]">
            <span className="font-grotesk text-[11px] font-bold text-[#FFD600] tracking-[2px]">DAY 1 EXPO</span>
          </div>
          {["DAY 2 PITCH", "DELEGATE FLOW", "STAGE NOTE"].map((tool, i) => (
            <div key={tool} className={`flex items-center flex-1 px-[32px] ${i < 2 ? "border-r border-r-[#2D2D2D]" : ""}`}>
              <span className="font-grotesk text-[11px] font-bold text-[#FF6B35] tracking-[2px]">{tool}</span>
            </div>
          ))}
        </div>

        {/* Data rows */}
        {rows.map((row, i) => (
          <div key={row.feature} className={`flex w-full h-[56px] transition-colors duration-200 hover:bg-[#161616] hover:border-l-2 hover:border-l-[#FFD600] ${i < rows.length - 1 ? "border-b border-b-[#1D1D1D]" : ""}`}>
            <div className="flex items-center w-[400px] shrink-0 px-[32px] border-r border-r-[#2D2D2D]">
              <span className="font-ibm-mono text-[12px] text-[#CCCCCC] tracking-[1px]">{row.feature} HRS</span>
            </div>
            <div className="flex items-center flex-1 px-[32px] bg-[#0D0D0D] border-r border-r-[#2D2D2D]">
              <span className="font-ibm-mono tracking-[1px] text-[#FFD600] font-bold text-[11px]">{row.pc}</span>
            </div>
            {[row.figma, row.sketch, row.framer].map((val, j) => (
              <div key={j} className={`flex items-center flex-1 px-[32px] ${j < 2 ? "border-r border-r-[#2D2D2D]" : ""}`}>
                <span className={`font-ibm-mono tracking-[1px] text-[#FF6B35] ${cellStyle(val)} ${cellColor(val)}`}>{val}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: card-per-feature layout */}
      <div className="flex flex-col md:hidden w-full gap-[2px]">
        {/* Header row */}
        <div className="grid grid-cols-5 bg-[#111111] border border-[#FFD600] border-b-2">
          <div className="col-span-2 px-3 py-3">
            <span className="font-grotesk text-[9px] font-bold text-[#888888] tracking-[1px]">TIME</span>
          </div>
          <div className="px-2 py-3 bg-[#1A1A1A]">
            <span className="font-grotesk text-[9px] font-bold text-[#FFD600] tracking-[1px]">D1</span>
          </div>
          <div className="px-2 py-3">
            <span className="font-grotesk text-[9px] font-bold text-[#FF6B35] tracking-[1px]">D2</span>
          </div>
          <div className="px-2 py-3">
            <span className="font-grotesk text-[9px] font-bold text-[#FF6B35] tracking-[1px]">DEL</span>
          </div>
        </div>
        {rows.map((row, i) => (
          <div key={row.feature} className={`grid grid-cols-5 border border-[#1D1D1D] transition-colors duration-200 hover:bg-[#161616] hover:border-[#FFD600] ${i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#0D0D0D]"}`}>
            <div className="col-span-2 flex items-center px-3 py-4">
              <span className="font-ibm-mono text-[9px] text-[#CCCCCC] tracking-[1px] leading-[1.4]">{row.feature} HRS</span>
            </div>
            <div className="flex items-center px-2 py-4 bg-[#0D0D0D]">
              <span className="font-ibm-mono text-[9px] text-[#FFD600] font-bold">{row.pc}</span>
            </div>
            <div className="flex items-center px-2 py-4">
              <span className={`font-ibm-mono text-[9px] text-[#FF6B35] ${cellColor(row.figma)}`}>{row.figma}</span>
            </div>
            <div className="flex items-center px-2 py-4">
              <span className={`font-ibm-mono text-[9px] text-[#FF6B35] ${cellColor(row.sketch)}`}>{row.sketch}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
