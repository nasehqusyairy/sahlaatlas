import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { getPhotosPage } from "~/.server/services/photo";
import { createClient } from "~/.server/supabase";
import { GallerySection } from "~/components/home/gallery-section";
import type { ComponentProps } from "~/models/route";

export const meta: MetaFunction = () => [
    { title: "Gallery | Sahla Atlas" },
    {
        name: "description",
        content:
            "Explore the Sahla Atlas gallery featuring Indonesian agricultural commodities, coffee, cocoa, tea, farmers, harvests, and export activities.",
    },
    {
        name: "keywords",
        content:
            "Sahla Atlas gallery, Indonesian coffee, Indonesian cocoa, Indonesian tea, coffee harvest, cocoa harvest, tea plantation, Indonesian agriculture",
    },
    {
        property: "og:title",
        content: "Gallery | Sahla Atlas",
    },
    {
        property: "og:description",
        content:
            "Explore moments from Indonesian agriculture, commodities, harvests, and Sahla Atlas export activities.",
    },
    {
        property: "og:type",
        content: "website",
    },
    {
        property: "og:url",
        content: "https://www.sahlaatlas.com/gallery",
    },
];

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const { photos } = await getPhotosPage(supabase, "active", { limit: null });

    return {
        photos,
    }
}

export default function Gallery(props: ComponentProps<typeof loader>) {
    return (
        <>
            <GallerySection items={props.loaderData.photos} />
        </>
    )
}