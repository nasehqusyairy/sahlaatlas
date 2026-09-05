import type { Article } from "~/models/article";

export function getArticleExcerpt(article: Article) {
    const content = article.content.trim();

    if (content.startsWith("http://") || content.startsWith("https://")) {
        return "Read the full article for more insights.";
    }

    return content.length > 150 ? `${content.slice(0, 147)}...` : content;
}
