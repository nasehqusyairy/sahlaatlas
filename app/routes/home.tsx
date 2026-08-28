import { AboutSection } from "~/components/home/about-section";
import { CommoditySection } from "~/components/home/commodity-section";
import { ContactSection } from "~/components/home/contact-section";
import { HeroSection } from "~/components/home/hero-section";
import { MenuSection } from "~/components/home/menu-section";
import { TestimonySection } from "~/components/home/testimony-section";
import { Maintenance } from "~/components/maintenance";
import { Navbar } from "~/components/navbar";
import { PageFooter } from "~/components/page-footer";

export async function loader() {
  return {
    is_production: process.env.APP_DEBUG == 'false'
  }
}

export default function Home(props: {
  loaderData: Awaited<ReturnType<typeof loader>>
}) {

  if (props.loaderData.is_production) {
    return <Maintenance />
  }

  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CommoditySection />
      <MenuSection />
      <ContactSection />
      <PageFooter />
    </>
  );
}
