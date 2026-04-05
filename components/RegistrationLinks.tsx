import SectionHeader from "./SectionHeader";

const links = [
  {
    title: "JAGRANPRENEURS",
    subtitle: "STARTUP BUSINESS CARNIVAL-2026",
    href: "https://forms.gle/g4uePK1451f2hYkd9",
    accent: "#FFD600",
  },
  {
    title: "START-UP EXPO-2026",
    subtitle: "STALL REGISTRATION FORM",
    href: "https://forms.gle/9CphHDinuvNBFwTXA",
    accent: "#FF6B35",
  },
  {
    title: "AUDIENCE / ALUMNI",
    subtitle: "REGISTRATION FORM",
    href: "https://forms.gle/X54AEDeAKzQkmhDP8",
    accent: "#4BE3FF",
  },
  {
    title: "SPONSORSHIP",
    subtitle: "PARTNERSHIP FORM",
    href: "https://forms.gle/PbEBNTCBiZxnf2EG9",
    accent: "#9EF01A",
  },
];

export default function RegistrationLinks() {
  return (
    <section id="registration-links" className="w-full bg-[#070707] py-16 px-5 sm:px-8 lg:px-16 xl:px-[120px]">
      <div className="flex flex-col gap-10 lg:gap-12">
        <SectionHeader
          label="[SPECIAL] // QUICK REGISTRATION"
          title={"CHOOSE YOUR\nENTRY ROUTE."}
          subtitle="ALL OFFICIAL 2026 FORMS ARE HERE. PICK THE TRACK AND SUBMIT DIRECTLY."
          titleWidth="w-full max-w-[860px]"
          subtitleWidth="w-full max-w-[760px]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border bg-[#101010] p-6 sm:p-8 transition-colors hover:bg-[#161616]"
              style={{ borderColor: "#2A2A2A" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: item.accent }} />
                  <p className="font-grotesk text-[16px] sm:text-[20px] font-bold tracking-[1px] text-[#F5F5F0]">
                    {item.title}
                  </p>
                </div>
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1.2px] group-hover:text-[#F5F5F0]">
                  OPEN FORM
                </span>
              </div>

              <p className="mt-3 font-ibm-mono text-[11px] sm:text-[12px] tracking-[1px] text-[#A0A09A]">
                {item.subtitle}
              </p>

              <div className="mt-5 inline-flex items-center justify-center border px-3 py-2 font-ibm-mono text-[10px] font-bold tracking-[1.5px] text-[#0A0A0A] transition-opacity group-hover:opacity-90" style={{ borderColor: item.accent, backgroundColor: item.accent }}>
                OPEN REGISTRATION LINK
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
