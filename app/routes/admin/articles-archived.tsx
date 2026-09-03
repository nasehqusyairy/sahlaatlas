import type { LoaderFunctionArgs } from "react-router";
import { createClient } from "~/.server/supabase";
import { getArticles } from "~/.server/services/article";
import Articles, { action } from "./articles";

export const handle = {
    title: "Archived Articles",
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const articles = await getArticles(supabase, "archived");
    return { articles };
}

export { action };
export default Articles;