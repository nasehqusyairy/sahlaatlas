import { useMemo, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { BlogFilters } from "~/components/blogs/blog-filters";
import { BlogGrid } from "~/components/blogs/blog-grid";
import { createClient } from "~/.server/supabase";
import { getArticles } from "~/.server/services/article";
import type { ComponentProps } from "~/models/route";

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const articles = await getArticles(supabase, "published");

    return { articles };
}

export function meta() {
    return [
        { title: "Blog & Wawasan Modern" },
        { name: "description", content: "Temukan artikel, panduan, dan wawasan terbaru seputar teknologi, desain, dan bisnis." },
    ];
}

export default function Blogs(props: ComponentProps<typeof loader>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");

    const publicArticles = props.loaderData.articles;
    const heroArticle = publicArticles[0];
    const latestArticles = useMemo(
        () => [...publicArticles].sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at)).slice(1, 3),
        [publicArticles],
    );
    const filteredArticles = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return publicArticles.filter((article) => {
            const matchesSearch = [article.title, article.author, ...(article.tags ?? []).map((tag) => tag.name)]
                .some((value) => value.toLowerCase().includes(query));
            const articleDate = new Date(article.created_at);
            const matchesMonth = selectedMonth === "all" || `${articleDate.getMonth() + 1}` === selectedMonth;
            const matchesYear = selectedYear === "all" || `${articleDate.getFullYear()}` === selectedYear;

            return matchesSearch && matchesMonth && matchesYear;
        });
    }, [publicArticles, searchQuery, selectedMonth, selectedYear]);

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedMonth("all");
        setSelectedYear("all");
    };

    if (!heroArticle) {
        return <div className="container mx-auto py-12 px-4">Belum ada artikel publik.</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4 gap-12 flex flex-col">
            <section className="flex flex-col gap-6">
                <BlogFilters
                    searchQuery={searchQuery}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    onSearchChange={setSearchQuery}
                    onMonthChange={setSelectedMonth}
                    onYearChange={setSelectedYear}
                />
            </section>

            <section>
                <BlogGrid articles={filteredArticles} onReset={resetFilters} />
            </section>
        </div>
    );
}
