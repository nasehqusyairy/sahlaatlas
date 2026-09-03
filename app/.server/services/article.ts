import type { SupabaseClient } from "@supabase/supabase-js";

export function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export type ArticleStatus = "published" | "draft" | "archived" | "all";

export async function getArticles(
    supabase: SupabaseClient,
    status: ArticleStatus = "published"
) {
    let query = supabase.from("articles").select("*");

    switch (status) {
        case "archived":
            // Mengambil artikel yang sudah di-archive (soft delete)
            query = query.not("deleted_at", "is", null);
            break;

        case "draft":
            // Mengambil artikel yang belum di-archive DAN belum di-publish
            query = query.is("deleted_at", null).eq("is_published", false);
            break;

        case "published":
            // Mengambil artikel yang belum di-archive DAN sudah di-publish
            query = query.is("deleted_at", null).eq("is_published", true);
            break;

        case "all":
            // Tidak menambahkan filter status (diambil semua untuk dashboard admin)
            break;
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw new Response(error.message, { status: 500 });
    return data;
}

export async function archiveArticle(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
        .from("articles")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);

    return error ? { error: error.message } : { success: true };
}

export async function restoreArticle(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
        .from("articles")
        .update({ deleted_at: null })
        .eq("id", id);

    return error ? { error: error.message } : { success: true };
}

export async function upsertArticle(
    supabase: SupabaseClient,
    formData: FormData,
    intent: "create" | "update"
) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const is_published = formData.get("is_published") === "true";


    const coverFile = formData.get("cover") as File | null;
    const contentFile = formData.get("content") as File | null

    let coverUrl = formData.get("existing_cover") as string;
    let contentUrl = formData.get("existing_content") as string;

    const timestamp = Date.now();

    // 1. Upload Cover Image jika ada file baru
    if (coverFile && coverFile.size > 0) {
        const ext = coverFile.name.split(".").pop();
        const path = `covers/${timestamp}.${ext}`;

        const { error: coverErr } = await supabase.storage
            .from("article_assets")
            .upload(path, coverFile, { upsert: true });

        if (coverErr) return { error: `Cover Upload Error: ${coverErr.message}` };

        const { data } = supabase.storage.from("article_assets").getPublicUrl(path);
        coverUrl = data.publicUrl;
    }

    // 2. Upload DOCX Content File jika ada file baru
    if (contentFile && contentFile.size > 0) {
        const path = `docs/${timestamp}_${contentFile.name}`;

        const { error: docErr } = await supabase.storage
            .from("article_assets")
            .upload(path, contentFile, { upsert: true });

        if (docErr) return { error: `Content Upload Error: ${docErr.message}` };

        const { data } = supabase.storage.from("article_assets").getPublicUrl(path);
        contentUrl = data.publicUrl;
    }

    if (intent === "create" && (!coverUrl || !contentUrl)) {
        return { error: "Cover image and DOCX content file are required." };
    }

    const payload = {
        title,
        slug: slugify(title),
        author,
        cover: coverUrl,
        content: contentUrl,
        is_published,
        updated_at: new Date().toISOString(),
    };

    if (intent === "create") {
        const { error } = await supabase.from("articles").insert([payload]);
        if (error) return { error: error.message };
    } else {
        const { error } = await supabase.from("articles").update(payload).eq("id", id);
        if (error) return { error: error.message };
    }

    return { success: true };
}