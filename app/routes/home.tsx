import { AboutSection } from "~/components/home/about-section";
import { HeroSection } from "~/components/home/hero-section";
import { MenuSection } from "~/components/home/menu-section";
import { TestimonySection } from "~/components/home/testimony-section";
import { Navbar } from "~/components/navbar";
import { PageFooter } from "~/components/page-footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <TestimonySection />
      <PageFooter />
    </>
  );
}
