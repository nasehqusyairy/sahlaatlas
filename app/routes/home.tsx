import { AboutSection } from "~/components/home/about-section";
import { CommoditySection } from "~/components/home/commodity-section";
import { ContactSection } from "~/components/home/contact-section";
import { HeroSection } from "~/components/home/hero-section";
import { GalleryCarousel } from "~/components/gallery-carousel";
import { createClient } from "~/.server/supabase";
import { getPhotosPage } from "~/.server/services/photo";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Sahla Atlas | Indonesian Agricultural Commodity Exporter" },
  {
    name: "description",
    content:
      "Sahla Atlas is an Indonesian export company supplying premium coffee, cocoa, and tea sourced from farmers across Indonesia to international markets.",
  },
  {
    name: "keywords",
    content:
      "Indonesian coffee exporter, Indonesian cocoa exporter, Indonesian tea exporter, agricultural commodity exporter, coffee beans, cocoa, tea, Sahla Atlas",
  },
  {
    property: "og:title",
    content: "Sahla Atlas | Indonesian Agricultural Commodity Exporter",
  },
  {
    property: "og:description",
    content:
      "Premium Indonesian coffee, cocoa, and tea sourced with care and delivered to international markets.",
  },
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:url",
    content: "https://www.sahlaatlas.com/",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createClient(request);
  const { photos } = await getPhotosPage(supabase, "active", { limit: null });

  return {
    photos,
  }
}

export default function Home(props: {
  loaderData: Awaited<ReturnType<typeof loader>>
}) {

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CommoditySection />
      <GalleryCarousel items={props.loaderData.photos} />
      <ContactSection />
    </>
  );
}
