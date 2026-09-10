import type { LoaderFunctionArgs } from "react-router";
import { getPhotosPage } from "~/.server/services/photo";
import { createClient } from "~/.server/supabase";
import { GallerySection } from "~/components/home/gallery-section";
import type { ComponentProps } from "~/models/route";

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