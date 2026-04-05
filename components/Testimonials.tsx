import SectionHeader from "./SectionHeader";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  bgColor?: string;
  accentColor: string;
}

function TestimonialCard({
  quote,
  name,
  role,
  bgColor = "#111111",
  accentColor,
}: TestimonialCardProps) {
  return (
    <div
      className="flex flex-col gap-6 p-8 md:p-[40px] border-l-4 w-full md:flex-1 transition-all duration-200 hover:brightness-110 hover:saturate-125"
      style={{ backgroundColor: bgColor, borderLeftColor: accentColor }}
    >
      <p className="font-ibm-mono text-[13px] text-[#CCCCCC] tracking-[1px] leading-[1.6]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-[12px]">
        <div className="w-[36px] h-[36px] rounded-full bg-[#333333] shrink-0" />
        <div className="flex flex-col gap-[2px]">
          <span className="font-grotesk text-[13px] font-bold text-[#F5F5F0] tracking-[1px]">
            {name}
          </span>
          <span className="font-ibm-mono text-[11px] text-[#555555] tracking-[1px]">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="flex flex-col w-full bg-[#0A0A0A] py-16 px-5 sm:px-8 lg:py-[100px] lg:px-16 xl:px-[120px] gap-12 lg:gap-[64px]">
      <SectionHeader
        label="[04] // CONCLAVE VOICES"
        title={"LEADERSHIP.\nENTREPRENEURSHIP. LEGACY."}
      />

      <div className="flex flex-col md:flex-row w-full gap-[2px]">
        <TestimonialCard
          quote="FROM VISION TO VENTURE IS OUR COMMITMENT TO BUILD ENTREPRENEURIAL THINKING WITH REAL INDUSTRY CONNECTIONS."
          name="JIEC ORGANIZING TEAM"
          role="JIM KANPUR"
          accentColor="#FFD600"
        />
        <TestimonialCard
          quote="WE ARE BRINGING STARTUPS, ALUMNI, MENTORS, AND LEADERS ON A COMMON PLATFORM FOR IMPACTFUL COLLABORATION."
          name="INDUSTRY MENTOR PANEL"
          role="CONCLAVE FACULTY & PARTNERS"
          bgColor="#0D0D0D"
          accentColor="#FF6B35"
        />
        <TestimonialCard
          quote="THE EVENT CONNECTS LEARNING, MENTORSHIP, FUNDING READINESS, AND CERTIFICATION FOR ASPIRING ENTREPRENEURS."
          name="I-TECH INNOVATION FOUNDATION"
          role="PROGRAM ASSOCIATE"
          accentColor="#F5F5F0"
        />
      </div>
    </section>
  );
}
