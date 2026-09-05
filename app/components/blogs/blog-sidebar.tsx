import { Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Article } from "~/models/article";

type BlogSidebarProps = {
    articles: Article[];
};

export function BlogSidebar({ articles }: BlogSidebarProps) {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="h-4 w-4 text-primary" /> Artikel Terbaru
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {articles.map((article) => (
                    <div key={article.id} className="flex gap-3 items-start border-b pb-2.5 last:border-0 last:pb-0">
                        <img src={article.cover} alt={article.title} className="h-12 w-16 object-cover rounded bg-muted shrink-0" />
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <Link to={`/blogs/${article.slug}`} className="font-semibold text-xs sm:text-sm line-clamp-2 hover:underline">
                                {article.title}
                            </Link>
                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(article.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
