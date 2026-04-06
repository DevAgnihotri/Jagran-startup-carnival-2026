export default function SponsorsShowcase() {
  return (
    <section id="sponsors" className="w-full bg-[#0A0A0A] py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-ibm-mono text-[10px] md:text-[12px] font-bold uppercase text-[#FFD600] tracking-[1.5px] md:tracking-[3px]">
              Sponsor Zone
            </p>
            <h2 className="font-grotesk mt-3 w-full max-w-[700px] whitespace-pre-line text-[36px] font-bold leading-[1.05] tracking-[-1px] text-[#F5F5F0] md:text-[56px]">
              Meet The Partners Powering Jagran 2026
            </h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <iframe
            src="/six-faces-walking-the-cow/index.html"
            title="Six Faces Walking The Cow showcase"
            className="block h-[100vh] min-h-[700px] w-full border-0 bg-black"
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="fullscreen"
          />
        </div>
      </div>
    </section>
  );
}
