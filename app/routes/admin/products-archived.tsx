import type { LoaderFunctionArgs } from "react-router";
import { getProductsPage } from "~/.server/services/product";
import { createClient } from "~/.server/supabase";
import Products, { action } from "./products";

export const handle = {
    title: "Archived Products",
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const requestedOffset = Number.parseInt(url.searchParams.get("offset") ?? "0", 10);
    const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;
    const limit = 10;
    const { products, total } = await getProductsPage(supabase, "archived", { search, offset, limit });
    return { products, total, offset, limit, search };
}

export { action }
export default Products