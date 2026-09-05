import mammoth from "mammoth";
import { type LoaderFunctionArgs } from "react-router";
import { createClient } from "~/.server/supabase";
import { getPublishedArticleBySlug } from "~/.server/services/article";
import BlogDetail from "./blog-detail";

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);

    // Khusus mengambil artikel dengan slug "about-us"
    const article = await getPublishedArticleBySlug(supabase, "about-us");

    if (!article || !article.content) {
        throw new Response("Halaman About Us tidak ditemukan", { status: 404 });
    }

    // 1. Ekstraksi Path Storage Supabase
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

    // 2. Download File dari Supabase Storage
    const { data: contentFile, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(storagePath);

    if (error || !contentFile) {
        console.error("Storage download error:", error);
        throw new Response(error?.message ?? "Gagal mengunduh konten About Us", { status: 502 });
    }

    // 3. Konversi DOCX ke HTML via Mammoth
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