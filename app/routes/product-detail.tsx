import mammoth from "mammoth";
import { type LoaderFunctionArgs } from "react-router";
import { createClient } from "~/.server/supabase";
import { getPublishedArticleBySlug } from "~/.server/services/article";
import type { ComponentProps } from "~/models/route";
import type { Product } from "~/models/product";
import { ArticleView } from "~/components/article-view";
import { getProductsPage } from "~/.server/services/product";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const slug = params.slug;
    if (!slug) throw new Response("Article not found", { status: 404 });
    const { supabase } = createClient(request);

    // Fetch only the article with the slug.
    const article = await getPublishedArticleBySlug(supabase, slug);

    if (!article || !article.content) {
        throw new Response("Page not found", { status: 404 });
    }

    
    const articleTagNames = 
        article.tags?.map((t: { name: string }) => t.name.toLowerCase().trim()) ?? [];

    let products: Product[] = [];
    if (articleTagNames.length > 0) {
        const productResult = await getProductsPage(supabase, 'active', { 
            tagNames: articleTagNames 
        });
        products = productResult.products ?? [];
    }

    // 3. Extract the Supabase Storage path.
    const BUCKET_NAME = "article_assets";
    let storagePath: string;

    try {
        const contentUrl = new URL(article.content);
        const bucketPathSegment = `/${BUCKET_NAME}/`;
        const pathIndex = contentUrl.pathname.indexOf(bucketPathSegment);

        if (pathIndex !== -1) {
            storagePath = decodeURIComponent(contentUrl.pathname.slice(pathIndex + bucketPathSegment.length));
        } else {
            storagePath = contentUrl.pathname.replace(/^\/+/, "");
        }
    } catch {
        storagePath = article.content.replace(/^\/+/, "");
    }

    // 4. Download the file from Supabase Storage.
    const { data: contentFile, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(storagePath);

    if (error || !contentFile) {
        console.error("Storage download error:", error);
        throw new Response(error?.message ?? "Failed to download About Us content", { status: 502 });
    }

    // 5. Convert DOCX to HTML with Mammoth.
    const blobBuffer = await contentFile.arrayBuffer();
    const nodeBuffer = Buffer.from(blobBuffer);

    const { value: html } = await mammoth.convertToHtml(
        { buffer: nodeBuffer },
        {
            convertImage: mammoth.images.imgElement(async (element) => {
                const imageBuffer = await element.read("base64");
                return {
                    src: `data:${element.contentType};base64,${imageBuffer}`,
                };
            }),
        }
    );

    return { article, html, products };
}

export default function ProductDetail({ loaderData }: ComponentProps<typeof loader>) {
    const { article, html, products } = loaderData;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <ArticleView article={article} html={html} />

     
        </div>
    );
}