import { Calendar } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import type { Article } from "~/models/article";
import { getArticleExcerpt } from "./blog-data";

type BlogGridProps = {
    articles: Article[];
    onReset: () => void;
};

export function BlogGrid({ articles, onReset }: BlogGridProps) {
    if (articles.length === 0) {
        return (
            <Card className="p-12 text-center flex flex-col items-center gap-3">
                <CardTitle>Artikel Tidak Ditemukan</CardTitle>
                <CardDescription>Coba ubah kata kunci pencarian atau sesuaikan filter bulan dan tahun Anda.</CardDescription>
                <Button variant="outline" size="sm" onClick={onReset}>Reset Semua Filter</Button>
            </Card>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <Card key={article.id} className="flex flex-col overflow-hidden justify-between">
                    <div>
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                            <img src={article.cover} alt={article.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                        </div>
                        <CardHeader className="gap-2 py-2">
                            <div className="flex items-center justify-between gap-2">
                                <Badge variant="secondary">Publik</Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                </span>
                            </div>
                            <CardTitle className="text-xl line-clamp-2">
                                <Link to={`/blogs/${article.slug}`} className="hover:underline">{article.title}</Link>
                            </CardTitle>
                            <CardDescription className="line-clamp-2">{getArticleExcerpt(article)}</CardDescription>
                        </CardHeader>
                    </div>
                    <CardFooter className="flex items-center gap-2 border-t pt-4">
                        <Avatar className="h-6 w-6"><AvatarFallback>{article.author[0]}</AvatarFallback></Avatar>
                        <span className="text-xs font-medium">{article.author}</span>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
