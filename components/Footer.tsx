const productLinks = [
  { label: "JAGRANPRENEUR", href: "https://forms.gle/g4uePK1451f2hYkd9" },
  { label: "STARTUP EXPO", href: "https://forms.gle/9CphHDinuvNBFwTXA" },
  { label: "ALUMNI / AUDIENCE REG", href: "https://forms.gle/X54AEDeAKzQkmhDP8" },
  { label: "SPONSORSHIP FORM", href: "https://forms.gle/PbEBNTCBiZxnf2EG9" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col w-full bg-[#050505]">
      {/* Top */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-[80px] px-5 sm:px-8 lg:px-16 xl:px-[120px] py-12 lg:py-[64px]">
        {/* Brand */}
        <div className="flex flex-col gap-6 md:w-[280px] md:shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] bg-[#FFD600] shrink-0" />
            <span className="font-grotesk text-[14px] sm:text-[16px] font-bold text-[#FFD600] tracking-[1.6px] sm:tracking-[3px] leading-none">
              JAGRAN CARNIVAL
            </span>
          </div>
          <p className="font-ibm-mono text-[11px] text-[#888888] tracking-[1px] leading-[1.6] max-w-[260px]">
            A TWO-DAY ENTREPRENEURSHIP PLATFORM FOR STARTUPS, STUDENTS, ALUMNI,
            AND INNOVATORS.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex md:flex-1">
          <div className="flex flex-col gap-4 md:gap-[20px]">
            <span className="font-grotesk text-[11px] font-bold text-[#F5F5F0] tracking-[2px]">
              REGISTRATION LINKS
            </span>
            {productLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ibm-mono text-[12px] text-[#888888] tracking-[1px] hover:text-[#CCCCCC] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full px-5 sm:px-8 lg:px-16 xl:px-[120px] py-4 md:h-[56px] border-t border-t-[#1D1D1D] gap-3 sm:gap-0">
        <span className="font-ibm-mono text-[11px] text-[#666666] tracking-[1px]">
          © 2026 JAGRAN CARNIVAL. ALL RIGHTS RESERVED.
        </span>
        <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[1px]">
          EVENT EDITION
        </span>
      </div>
    </footer>
  );
}
