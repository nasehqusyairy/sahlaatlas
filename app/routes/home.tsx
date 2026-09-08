import { AboutSection } from "~/components/home/about-section";
import { CommoditySection } from "~/components/home/commodity-section";
import { ContactSection } from "~/components/home/contact-section";
import { HeroSection } from "~/components/home/hero-section";
import { GallerySection } from "~/components/home/gallery-section";
import { Maintenance } from "~/components/maintenance";
import { createClient } from "~/.server/supabase";
import { getPhotosPage } from "~/.server/services/photo";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createClient(request);
  const { photos } = await getPhotosPage(supabase, "active", { limit: null });

  return {
    is_production: process.env.APP_DEBUG == 'false',
    photos,
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
      <HeroSection />
      <AboutSection />
      <CommoditySection />
      <GallerySection items={props.loaderData.photos} />
      <ContactSection />
    </>
  );
}
