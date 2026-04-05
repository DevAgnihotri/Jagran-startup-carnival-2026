import SectionHeader from "./SectionHeader";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  bgClassName?: string;
  borderColor?: string;
  borderWidth?: number;
}

function StepCard({
  number,
  title,
  description,
  bgClassName = "bg-[#0A0A0A]",
  borderColor = "#2D2D2D",
  borderWidth = 1,
}: StepCardProps) {
  return (
    <div
      className={`group flex flex-col gap-4 p-8 md:p-[40px] border w-full md:flex-1 md:h-[260px] transition-colors duration-200 ${bgClassName} hover:bg-[#FFD600]`}
      style={{ borderColor, borderWidth }}
    >
      <span className="font-grotesk text-[48px] font-bold text-[#FFD600] tracking-[-2px] transition-colors duration-200 group-hover:text-[#0A0A0A]">
        {number}
      </span>
      <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0] tracking-[1px] leading-[1.2] whitespace-pre-line transition-colors duration-200 group-hover:text-[#0A0A0A]">
        {title}
      </h3>
      <p className="font-ibm-mono text-[11px] text-[#555555] tracking-[1px] leading-[1.5] transition-colors duration-200 group-hover:text-[#0A0A0A]">
        {description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="flex flex-col w-full bg-[#0D0D0D] py-16 px-5 sm:px-8 lg:py-[100px] lg:px-16 xl:px-[120px] gap-12 lg:gap-[64px]">
      <SectionHeader
        label="[02] // HOW IT WORKS"
        title={"THREE STEPS.\nREADY TO PARTICIPATE."}
      />

      <div className="flex flex-col md:flex-row w-full gap-[2px]">
        <StepCard
          number="01"
          title={"CHOOSE YOUR\nTRACK"}
          description="SELECT DAY 1 EXPO, DAY 2 PITCH, OR AUDIENCE / ALUMNI / PANEL REGISTRATION."
        />
        <StepCard
          number="02"
          title={"SUBMIT THE\nFORM"}
          description="FILL YOUR DETAILS, SHARE STARTUP OR PROFILE INFO, AND CONFIRM YOUR PARTICIPATION."
          bgClassName="bg-[#111111]"
          borderColor="#FFD600"
          borderWidth={1}
        />
        <StepCard
          number="03"
          title={"GET\nCONFIRMED"}
          description="OUR TEAM REVIEWS YOUR SUBMISSION AND SHARES THE CONFIRMATION VIA EMAIL OR PHONE."
        />
      </div>
    </section>
  );
}
