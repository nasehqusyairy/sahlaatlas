import type { LoaderFunctionArgs } from "react-router";
import { createClient } from "~/.server/supabase";
import { getArticlesPage } from "~/.server/services/article";
import Articles, { action } from "./articles";

export const handle = {
    title: "Archived Articles",
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const requestedOffset = Number.parseInt(url.searchParams.get("offset") ?? "0", 10);
    const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;
    const limit = 10;
    const { articles, total } = await getArticlesPage(supabase, "archived", { search, offset, limit });
    return { articles, total, offset, limit, search };
}

export { action };
export default Articles;