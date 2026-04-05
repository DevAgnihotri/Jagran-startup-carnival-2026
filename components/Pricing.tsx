import SectionHeader from "./SectionHeader";
import CardLanyardSection from "./CardLanyardSection";
import Link from "next/link";

interface PricingCardProps {
  tier: string;
  tierColor?: string;
  name: string;
  nameColor?: string;
  price: string;
  priceNote?: string;
  priceColor?: string;
  btnLabel: string;
  btnLabelColor?: string;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  btnBg?: string;
  btnBorderColor?: string;
  tierBg?: string;
  tierBorderColor?: string;
  features: { label: string; included: boolean }[];
  accentColor?: string;
  ctaHref?: string;
}

function PricingCard({
  tier,
  tierColor = "#888888",
  name,
  nameColor = "#F5F5F0",
  price,
  priceNote = "",
  priceColor = "#F5F5F0",
  btnLabel,
  btnLabelColor = "#888888",
  bgColor = "#0F0F0F",
  borderColor = "#2D2D2D",
  borderWidth = 1,
  btnBg = "#1A1A1A",
  btnBorderColor = "#3D3D3D",
  tierBg = "#1A1A1A",
  tierBorderColor = "#3D3D3D",
  features,
  accentColor = "#555555",
  ctaHref = "/auth/login?next=/dashboard",
}: PricingCardProps) {
  return (
    <div
      className="flex flex-col gap-8 p-6 sm:p-8 md:p-[40px] w-full xl:flex-1 transition-all duration-200 hover:brightness-110 hover:saturate-125"
      style={{ backgroundColor: bgColor, border: `${borderWidth}px solid ${borderColor}` }}
    >
      <div
        className="flex items-center justify-center h-[28px] px-[12px] w-fit"
        style={{ backgroundColor: tierBg, border: `1px solid ${tierBorderColor}` }}
      >
        <span className="font-ibm-mono text-[11px] tracking-[2px]" style={{ color: tierColor }}>
          {tier}
        </span>
      </div>
      <span className="font-grotesk text-[28px] font-bold tracking-[1px]" style={{ color: nameColor }}>
        {name}
      </span>
      <div className="flex items-end gap-[4px]">
        <span className="font-grotesk text-[48px] font-bold tracking-[-2px] leading-none" style={{ color: priceColor }}>
          {price}
        </span>
        {priceNote && <span className="font-ibm-mono text-[13px] text-[#555555] tracking-[1px] mb-[6px]">{priceNote}</span>}
      </div>

      {/* Feature list */}
      <div className="flex flex-col gap-[10px]" style={{ borderTop: `1px solid ${borderColor === "#0F0F0F" ? "#2D2D2D" : borderColor}` }}>
        <div className="pt-6 flex flex-col gap-[10px]">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="font-ibm-mono text-[14px] leading-none shrink-0"
                style={{ color: f.included ? accentColor : "#333333" }}
              >
                {f.included ? "+" : "—"}
              </span>
              <span
                className="font-ibm-mono text-[11px] tracking-[1px]"
                style={{ color: f.included ? "#A0A09A" : "#3D3D3D" }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href={ctaHref}
        className="flex items-center justify-center w-full h-[48px] mt-auto"
        style={{ backgroundColor: btnBg, border: `2px solid ${btnBorderColor}` }}
      >
        <span className="font-ibm-mono text-[12px] tracking-[2px]" style={{ color: btnLabelColor }}>
          {btnLabel}
        </span>
      </Link>
    </div>
  );
}

const BUILDER_FEATURES = [
  { label: "DAY 1 STARTUP STALL", included: true },
  { label: "FULLY EQUIPPED STALL SPACE", included: true },
  { label: "DEDICATED SPOC SUPPORT", included: true },
  { label: "COMPLIMENTARY LUNCH FOR 2", included: true },
  { label: "FELICITATION ELIGIBILITY", included: true },
  { label: "EXPO FLOOR BRAND VISIBILITY", included: true },
  { label: "DIRECT AUDIENCE FEEDBACK", included: true },
  { label: "PRIORITY MENTOR SLOT", included: false },
];

const ARCHITECT_FEATURES = [
  { label: "DAY 2 IDEA PITCH ACCESS", included: true },
  { label: "JURY EVALUATION", included: true },
  { label: "PANEL DISCUSSION ENTRY", included: true },
  { label: "NETWORKING BLOCK ACCESS", included: true },
  { label: "MENTOR FEEDBACK WINDOW", included: true },
  { label: "JAGRANPRENEUR CROWN ELIGIBILITY", included: true },
  { label: "STALL SPACE (DAY 1)", included: false },
  { label: "PRIVATE DEMO POD", included: false },
];

const SYSTEM_FEATURES = [
  { label: "AUDIENCE / ALUMNI ACCESS", included: true },
  { label: "PANELIST REGISTRATION", included: true },
  { label: "TALKS & STORY SESSIONS", included: true },
  { label: "COMMUNITY NETWORKING", included: true },
  { label: "DELEGATE PARTICIPATION", included: true },
  { label: "INSPIRATION TRACK ENTRY", included: true },
  { label: "PITCH STAGE SLOT", included: false },
  { label: "EXPO STALL SPACE", included: false },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-visible flex flex-col w-full bg-[#080808] px-5 sm:px-8 lg:px-16 xl:px-[120px] pt-16 sm:pt-20 lg:pt-[360px] pb-16 lg:pb-[100px] gap-12 lg:gap-[64px]">
      <div className="pointer-events-none absolute inset-x-0 -top-[320px] z-30 hidden lg:flex justify-center">
        <div className="pointer-events-auto w-full max-w-4xl">
          <CardLanyardSection
            containerClassName="relative aspect-square w-full h-[820px]"
            position={[0, 0, 18]}
          />
        </div>
      </div>

      <SectionHeader
        label="[09] // REGISTRATION"
        title={"CHOOSE YOUR\nPARTICIPATION TRACK."}
      />

      <div className="flex flex-col xl:flex-row w-full gap-[2px]">
        <PricingCard
          tier="DAY 1"
          name="EXPO STALL"
          price="RS. 2,500"
          btnLabel="OPEN EXPO FORM"
          ctaHref="https://forms.gle/9CphHDinuvNBFwTXA"
          features={BUILDER_FEATURES}
          accentColor="#555555"
        />
        <PricingCard
          tier="DAY 2"
          tierColor="#0A0A0A"
          tierBg="#FFD600"
          tierBorderColor="#FFD600"
          name="IDEA PITCH"
          nameColor="#FFD600"
          price="NO FEE"
          priceColor="#FFD600"
          btnLabel="OPEN JAGRANPRENEURS FORM"
          btnLabelColor="#0A0A0A"
          bgColor="#111111"
          borderColor="#FFD600"
          borderWidth={2}
          btnBg="#FFD600"
          btnBorderColor="transparent"
          ctaHref="https://forms.gle/g4uePK1451f2hYkd9"
          features={ARCHITECT_FEATURES}
          accentColor="#FFD600"
        />
        <PricingCard
          tier="OPEN ACCESS"
          tierColor="#FF6B35"
          tierBorderColor="#FF6B35"
          name="DELEGATE / ALUMNI / PANEL"
          price="FREE"
          btnLabel="OPEN AUDIENCE / ALUMNI FORM"
          ctaHref="https://forms.gle/X54AEDeAKzQkmhDP8"
          btnLabelColor="#FF6B35"
          btnBorderColor="#FF6B35"
          features={SYSTEM_FEATURES}
          accentColor="#FF6B35"
        />
      </div>
    </section>
  );
}
