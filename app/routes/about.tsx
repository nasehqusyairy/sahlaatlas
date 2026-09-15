import mammoth from "mammoth";
import { type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { createClient } from "~/.server/supabase";
import { getPublishedArticleBySlug } from "~/.server/services/article";
import BlogDetail from "./blog-detail";

export const meta: MetaFunction = () => [
    { title: "About Us | Sahla Atlas" },
    {
        name: "description",
        content:
            "Learn about Sahla Atlas, an Indonesian agricultural commodity export company connecting quality coffee, cocoa, and tea from Indonesian farmers with global markets.",
    },
    {
        name: "keywords",
        content:
            "about Sahla Atlas, Indonesian exporter, agricultural commodities, Indonesian coffee, Indonesian cocoa, Indonesian tea, export company",
    },
    {
        property: "og:title",
        content: "About Us | Sahla Atlas",
    },
    {
        property: "og:description",
        content:
            "Discover Sahla Atlas and our commitment to quality, sustainability, and long-term partnerships in Indonesian agricultural commodity exports.",
    },
    {
        property: "og:type",
        content: "website",
    },
    {
        property: "og:url",
        content: "https://www.sahlaatlas.com/about",
    },
];

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);

    // Fetch only the article with the "about-us" slug.
    const article = await getPublishedArticleBySlug(supabase, "about-us");

    if (!article || !article.content) {
        throw new Response("About Us page not found", { status: 404 });
    }

    // 1. Extract the Supabase Storage path.
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

    // 2. Download the file from Supabase Storage.
    const { data: contentFile, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(storagePath);

    if (error || !contentFile) {
        console.error("Storage download error:", error);
        throw new Response(error?.message ?? "Failed to download About Us content", { status: 502 });
    }

    // 3. Convert DOCX to HTML with Mammoth.
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

    return { article, html };
}

export default BlogDetail