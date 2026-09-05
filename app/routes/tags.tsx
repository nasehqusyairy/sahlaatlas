import type { LoaderFunctionArgs } from "react-router";
import { createClient } from "~/.server/supabase";
import { getTags } from "~/.server/services/tag";

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const tags = await getTags(supabase);

    return { tags };
}
