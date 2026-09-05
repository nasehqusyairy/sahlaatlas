import type { LoaderFunctionArgs } from "react-router";
import { useSearchParams } from "react-router";
import { BlogFilters } from "~/components/blogs/blog-filters";
import { BlogGrid } from "~/components/blogs/blog-grid";
import { createClient } from "~/.server/supabase";
import { getArticlesPage } from "~/.server/services/article";
import { getTags } from "~/.server/services/tag";
import type { ComponentProps } from "~/models/route";

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const tagNames = url.searchParams.get("tags")?.split(",").filter(Boolean) ?? [];
    const requestedOffset = Number.parseInt(url.searchParams.get("offset") ?? "0", 10);
    const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;
    const limit = 10;
    const [{ articles, total }, tags] = await Promise.all([
        getArticlesPage(supabase, "published", { search, tagNames, offset, limit }),
        getTags(supabase),
    ]);

    return { articles, tags, total, offset, limit, hasMore: offset + articles.length < total };
}

export function meta() {
    return [
        { title: "Blog & Wawasan Modern" },
        { name: "description", content: "Temukan artikel, panduan, dan wawasan terbaru seputar teknologi, desain, dan bisnis." },
    ];
}

export default function Blogs(props: ComponentProps<typeof loader>) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") ?? "";
    const selectedTagNames = searchParams.get("tags")?.split(",").filter(Boolean) ?? [];

    return (
        <div className="container mx-auto p-4 gap-4 flex flex-col min-h-screen">
            <section className="flex flex-col gap-6">
                <BlogFilters
                    searchQuery={searchQuery}
                    selectedTagNames={selectedTagNames}
                    tags={props.loaderData.tags}
                />
            </section>

            <section>
                <BlogGrid
                    articles={props.loaderData.articles}
                    hasMore={props.loaderData.hasMore}
                    offset={props.loaderData.offset}
                />
            </section>
        </div>
    );
}
