import Navbar from "@/components/Navbar";
import Hero, { HeroBottomSvgSection } from "@/components/Hero";
import PixelDivider from "@/components/PixelDivider";
import Logos from "@/components/Logos";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Bento from "@/components/Bento";
import Showcase from "@/components/Showcase";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import RegistrationLinks from "@/components/RegistrationLinks";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-[#0A0A0A] pt-[60px]">
      <Navbar />
      <Hero />
      <PixelDivider />
      <Logos />
      <RegistrationLinks />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Bento />
      <Showcase />
      <FAQ />
      <Pricing />
      <FinalCTA />
      <HeroBottomSvgSection />
      <Footer />
    </main>
  );
}
