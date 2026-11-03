import { Footer } from "@/components/layout/Footer";
import { PersonJsonLd } from "@/components/layout/PersonJsonLd";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Recommendations } from "@/components/sections/Recommendations";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Expertise />
        <Experience />
        <Tools />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
