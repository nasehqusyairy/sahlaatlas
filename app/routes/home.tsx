import { AboutSection } from "~/components/home/about-section";
import { CommoditySection } from "~/components/home/commodity-section";
import { ContactSection } from "~/components/home/contact-section";
import { HeroSection } from "~/components/home/hero-section";
import { GalleryCarousel } from "~/components/gallery-carousel";
import { createClient } from "~/.server/supabase";
import { getPhotosPage } from "~/.server/services/photo";
import type { LoaderFunctionArgs } from "react-router";

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
