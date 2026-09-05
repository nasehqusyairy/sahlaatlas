import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import type { Article } from "~/models/article";
import { getArticleExcerpt } from "./blog-data";

type BlogHeroProps = {
    article: Article;
};

export function BlogHero({ article }: BlogHeroProps) {
    return (
        <Card className="lg:col-span-2 relative overflow-hidden flex flex-col justify-end border-0 min-h-105 lg:min-h-full group">
            <img
                src={article.cover}
                alt={article.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/20" />
            <div className="relative p-6 sm:p-8 flex flex-col gap-4 text-white">
                <div className="flex items-center gap-2">
                    <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground">Sorotan Utama</Badge>
                    <Badge variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm">
                        Artikel publik
                    </Badge>
                </div>
                <CardTitle className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
                    <Link to={`/blogs/${article.slug}`} className="hover:underline">
                        {article.title}
                    </Link>
                </CardTitle>
                <CardDescription className="text-white/80 text-sm sm:text-base line-clamp-2">
                    {getArticleExcerpt(article)}
                </CardDescription>
                <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-white/30">
                            <AvatarFallback>{article.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-medium text-white">{article.author}</span>
                            <span className="text-xs text-white/70 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                            </span>
                        </div>
                    </div>
                    <Button render={<Link to={`/blogs/${article.slug}`} />} size="sm" className="gap-1.5 bg-white text-black hover:bg-white/90">
                        Baca Artikel <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
