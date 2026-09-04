import type { LoaderFunctionArgs } from "react-router";
import { getProducts } from "~/.server/services/product";
import { createClient } from "~/.server/supabase";
import Products, { action } from "./products";

export const handle = {
    title: "Archived Products",
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const products = await getProducts(supabase, "archived");
    return { products };
}

export { action }
export default Products