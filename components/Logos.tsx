const logos = ["JIEC", "STARTUP CLUBS", "ALUMNI NETWORK", "INDUSTRY MENTORS", "INNOVATION CELL"];

export default function Logos() {
  return (
    <section className="flex flex-col items-center w-full bg-[#0F0F0F] py-[48px] px-5 sm:px-8 lg:px-16 xl:px-[120px] gap-[32px]">
      <span className="font-ibm-mono text-[10px] sm:text-[11px] text-[#A7A79E] tracking-[1.5px] sm:tracking-[3px] text-center">
        POWERED BY THE JAGRAN ENTREPRENEURSHIP ECOSYSTEM
      </span>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-[64px] w-full">
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-grotesk text-[13px] md:text-[14px] font-bold text-[#E4E4DD] tracking-[2px]"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
