import SectionHeader from "./SectionHeader";

interface FeatureCardProps {
  iconColor: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  bgClassName: string;
  borderColor?: string;
  hoverBgClassName: string;
}

function FeatureCard({
  iconColor,
  title,
  description,
  tag,
  tagColor,
  bgClassName,
  borderColor = "#2D2D2D",
  hoverBgClassName,
}: FeatureCardProps) {
  return (
    <div
      className={`group flex flex-col gap-5 p-8 md:p-[32px] border w-full md:flex-1 md:h-[320px] transition-colors duration-200 ${bgClassName} ${hoverBgClassName}`}
      style={{
        borderColor,
        ["--tag-color" as any]: tagColor,
      }}
    >
      <div className="w-[40px] h-[40px] shrink-0" style={{ backgroundColor: iconColor }} />
      <h3 className="font-grotesk text-[18px] font-bold text-[#F5F5F0] tracking-[1px] leading-[1.2] whitespace-pre-line transition-colors duration-200 group-hover:text-[#0A0A0A]">
        {title}
      </h3>
      <p className="font-ibm-mono text-[12px] text-[#666666] tracking-[1px] leading-[1.6] transition-colors duration-200 group-hover:text-[#0A0A0A]">
        {description}
      </p>
      <div className="flex items-center justify-center h-[28px] px-[12px] bg-[#1A1A1A] border border-[var(--tag-color)] w-fit transition-colors duration-200 group-hover:bg-[var(--tag-color)] group-hover:border-[#0A0A0A]">
        <span className="font-ibm-mono text-[11px] tracking-[2px] text-[var(--tag-color)] transition-colors duration-200 group-hover:text-[#0A0A0A]">
          {tag}
        </span>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="flex flex-col w-full bg-[#0A0A0A] py-16 px-5 sm:px-8 lg:py-[100px] lg:px-16 xl:px-[120px] gap-12 lg:gap-[64px]"
    >
      <SectionHeader
        label="[01] // STARTUP STALL EXPO"
        title={"SHOWCASE YOUR IDEA.\nMEET YOUR AUDIENCE."}
        subtitle="DAY 1 OF JAGRAN CARNIVAL IS BUILT FOR VISIBILITY, NETWORKING, AND REAL FEEDBACK."
      />

      <div className="flex flex-col md:flex-row w-full gap-[2px]">
        <FeatureCard
          iconColor="#FFD600"
          title={"STALL\nREGISTRATION"}
          description="PRESENT YOUR IDEAS, PRODUCTS, AND INNOVATIONS TO A HIGH-INTENT AUDIENCE."
          tag="DAY 1"
          tagColor="#FFD600"
          borderColor="#FFD600"
          bgClassName="bg-[#111111]"
          hoverBgClassName="hover:bg-[#FFD600]"
        />
        <FeatureCard
          iconColor="#FF3B30"
          title={"EXHIBITOR\nBENEFITS"}
          description="BRAND VISIBILITY, STALL SPACE, SPOC SUPPORT, FEEDBACK, FELICITATION, AND LUNCH FOR 2 MEMBERS."
          tag="BENEFITS"
          tagColor="#FF3B30"
          bgClassName="bg-[#0F0F0F]"
          borderColor="#FF3B30"
          hoverBgClassName="hover:bg-[#FF3B30]"
        />
        <FeatureCard
          iconColor="#F5F5F0"
          title={"WHO SHOULD\nAPPLY"}
          description="STARTUPS, BRANDS, INFLUENCERS, OPEN-SOURCE TEAMS, STUDENT VENTURES, AND CAMPUS INNOVATORS."
          tag="OPEN"
          tagColor="#F5F5F0"
          borderColor="#F5F5F0"
          bgClassName="bg-[#111111]"
          hoverBgClassName="hover:bg-[#F5F5F0]"
        />
      </div>
    </section>
  );
}
