import type { Article } from "~/models/article";
import { ArticleHeader } from "./article-header";

export function ArticleView(props: {
    article: Article
    html: string
}) {
    return (
        <main>
            <article>
                <ArticleHeader article={props.article} />
                <section className="docx-content prose dark:prose-invert container mx-auto p-4" dangerouslySetInnerHTML={{ __html: props.html }} />
            </article>
        </main>
    )
}