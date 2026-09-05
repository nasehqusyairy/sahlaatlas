import type { Article } from "~/models/article";

export function getArticleExcerpt(article: Article) {
    const content = article.content.trim();

    if (content.startsWith("http://") || content.startsWith("https://")) {
        return "Baca artikel lengkap untuk mendapatkan wawasan selengkapnya.";
    }

    return content.length > 150 ? `${content.slice(0, 147)}...` : content;
}
