import type { LoaderFunctionArgs } from "react-router";
import { getCatalogs } from "~/.server/services/catalog";
import { createClient } from "~/.server/supabase";
import Catalogs, { action } from "./catalogs";

export const handle = {
    title: "Archived Catalogs",
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const catalogs = await getCatalogs(supabase, "archived");
    return { catalogs };
}

export { action }
export default Catalogs