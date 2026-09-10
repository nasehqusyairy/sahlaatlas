import { ArrowUp, Calendar, User } from "lucide-react";
import { Badge } from "./ui/badge";
import type { Article } from "~/models/article";

export function ArticleHeader(props: {
    hideMeta?: boolean
    hideCover?: boolean
    article: Partial<Article>;
}) {
    return (
        <section className="container mx-auto p-4">
            <div className="mb-8 space-y-5">
                <div className="flex flex-wrap gap-2">
                    {props.article.tags?.map((tag) => (
                        <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
                    ))}
                </div>
                <h1 className="font-heading text-3xl font-bold leading-tight sm:text-5xl">
                    {props.article.title}
                </h1>
                {props.hideMeta || (
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="size-4" />{props.article.author}</span>
                        {props.article.created_at && (
                            <span className="flex items-center gap-1.5">
                                <Calendar className="size-4" />
                                {new Date(props.article.created_at).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        )}
                        {props.article.updated_at && (
                            <span className="flex items-center gap-1.5">
                                <ArrowUp className="size-4" />
                                {new Date(props.article.updated_at).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        )}
                    </div>
                )}
            </div>
            {props.hideCover || (
                <img src={props.article.cover || '/images/hero.jpg'} alt={props.article.title} className="mb-10 aspect-video w-full object-cover" loading="lazy" />
            )}
        </section>
    )
}