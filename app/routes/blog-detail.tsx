import mammoth from "mammoth";
import { type LoaderFunctionArgs } from "react-router";
import { Calendar, User } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { createClient } from "~/.server/supabase";
import { getPublishedArticleBySlug } from "~/.server/services/article";
import type { ComponentProps } from "~/models/route";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const slug = params.slug;
    if (!slug) throw new Response("Article not found", { status: 404 });

    const { supabase } = createClient(request);
    const article = await getPublishedArticleBySlug(supabase, slug);

    if (!article || !article.content) {
        throw new Response("Article content not found", { status: 404 });
    }

    // 1. Ekstraksi Path Storage dengan Robust
    const BUCKET_NAME = "article_assets";
    let storagePath: string;

    try {
        const contentUrl = new URL(article.content);
        // Mencari posisi setelah nama bucket di path URL Supabase
        const bucketPathSegment = `/${BUCKET_NAME}/`;
        const pathIndex = contentUrl.pathname.indexOf(bucketPathSegment);

        if (pathIndex !== -1) {
            storagePath = decodeURIComponent(contentUrl.pathname.slice(pathIndex + bucketPathSegment.length));
        } else {
            // Fallback jika article.content menyimpannya sebagai relatif path/key saja
            storagePath = contentUrl.pathname.replace(/^\/+/, "");
        }
    } catch {
        // Fallback jika article.content bukan URL valid (hanya string path misal: "folder/file.docx")
        storagePath = article.content.replace(/^\/+/, "");
    }

    // 2. Download File dari Supabase Storage
    const { data: contentFile, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(storagePath);

    if (error || !contentFile) {
        console.error("Storage download error:", error);
        throw new Response(error?.message ?? "Article content could not be downloaded", { status: 502 });
    }

    // 3. Konversi DOCX ke HTML via Mammoth (dengan penanganan ArrayBuffer yang aman)
    const blobBuffer = await contentFile.arrayBuffer();
    const nodeBuffer = Buffer.from(blobBuffer); // Mengubah ke Node Buffer agar Mammoth berjalan lancar di SSR

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

export default function BlogDetail({ loaderData }: ComponentProps<typeof loader>) {
    const { article, html } = loaderData;

    return (
        <main className="container mx-auto p-4">

            <article>
                <header className="mb-8 space-y-5">
                    <div className="flex flex-wrap gap-2">
                        {article.tags?.map((tag) => (
                            <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
                        ))}
                    </div>
                    <h1 className="font-heading text-3xl font-bold leading-tight sm:text-5xl">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="size-4" />{article.author}</span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="size-4" />
                            {new Date(article.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </header>

                {article.cover && (
                    <img src={article.cover} alt={article.title} className="mb-10 aspect-video w-full object-cover" loading="lazy" />
                )}

                <section className="docx-content prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
            </article>
        </main>
    );
}