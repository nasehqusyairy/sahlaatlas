import { Calendar, FileQuestion, LoaderCircle, User } from "lucide-react";
import { Link, useFetcher, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import type { Article } from "~/models/article";
import type { loader } from "~/routes/blogs";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";

type BlogGridProps = {
    articles: Article[];
    hasMore: boolean;
    offset: number;
};

export function BlogGrid({ articles, hasMore: initialHasMore, offset }: BlogGridProps) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const fetcher = useFetcher<typeof loader>();
    const [loadedArticles, setLoadedArticles] = useState(articles);
    const [hasMore, setHasMore] = useState(initialHasMore);

    useEffect(() => {
        setLoadedArticles(articles);
        setHasMore(initialHasMore);
    }, [articles, initialHasMore]);

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            const nextData = fetcher.data;
            setLoadedArticles((currentArticles) => [...currentArticles, ...nextData.articles]);
            setHasMore(nextData.hasMore);
        }
    }, [fetcher.data, fetcher.state]);

    const loadMore = () => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("offset", `${offset + loadedArticles.length}`);
        fetcher.load(`/blogs?${nextParams.toString()}`);
    };

    if (loadedArticles.length === 0) {
        return (
            <Card>
                <CardContent>
                    <Empty className="p-12">
                        <EmptyHeader>
                            <EmptyMedia variant={'icon'} className="bg-primary">
                                <FileQuestion className="text-primary-foreground" />
                            </EmptyMedia>
                            <EmptyTitle>No Articles Found</EmptyTitle>
                            <EmptyDescription>
                                Try changing your search keywords or selected tags.
                            </EmptyDescription>
                        </EmptyHeader>
                        <Button variant="outline" size="sm" onClick={() => navigate("/blogs")}>
                            Reset All Filters
                        </Button>
                    </Empty>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {loadedArticles.map((article) => (
                    <Card key={article.id} className="flex flex-col overflow-hidden justify-between pt-0">
                        <div>
                            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                <img src={article.cover} alt={article.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                                {article.tags && article.tags.length > 0 && (
                                    <div className="absolute left-0 bottom-0 flex w-1/2 flex-wrap gap-1 p-2">
                                        {article.tags.map((tag) => (
                                            <Badge key={tag.id} variant="secondary" className="max-w-full">
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <CardHeader className="gap-2 py-2">
                                <CardTitle className="text-xl line-clamp-2">
                                    <Link to={`/blogs/${article.slug}`} className="hover:underline">{article.title}</Link>
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(article.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <CardFooter className="flex items-center gap-2 border-t pt-4">
                            <Avatar className="size-6"><AvatarFallback><User className="size-4" /></AvatarFallback></Avatar>
                            <span className="text-xs font-medium">{article.author}</span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {hasMore && (
                <Button variant="outline" className="mx-auto" onClick={loadMore} disabled={fetcher.state !== "idle"}>
                    {fetcher.state !== "idle" && <LoaderCircle className="animate-spin" />}
                    {fetcher.state !== "idle" ? "Loading..." : "Load more"}
                </Button>
            )}
        </div>
    );
}
