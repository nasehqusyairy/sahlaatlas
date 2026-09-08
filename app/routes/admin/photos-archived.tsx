import type { LoaderFunctionArgs } from "react-router";
import { getPhotosPage } from "~/.server/services/photo";
import { createClient } from "~/.server/supabase";
import Photos, { action } from "./photos";

export const handle = { title: "Archived Photos" };

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const requestedOffset = Number.parseInt(url.searchParams.get("offset") ?? "0", 10);
    const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;
    const limit = 10;
    const { photos, total } = await getPhotosPage(supabase, "archived", { search, offset, limit });
    return { photos, total, offset, limit, search };
}

export { action };
export default Photos;