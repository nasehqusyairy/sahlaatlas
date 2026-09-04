import type { SupabaseClient } from "@supabase/supabase-js";
import { archiveRecord, restoreRecord, slugify, uploadStorageFile } from "./base";

export type ArticleStatus = "published" | "draft" | "archived" | "all";

export type Article = {
    id: string;
    title: string;
    slug: string;
    author: string;
    cover: string;
    content: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export async function getArticles(
    supabase: SupabaseClient,
    status: ArticleStatus = "published"
) {
    let query = supabase.from("articles").select("*");

    switch (status) {
        case "archived":
            query = query.not("deleted_at", "is", null);
            break;

        case "draft":
            query = query.is("deleted_at", null).eq("is_published", false);
            break;

        case "published":
            query = query.is("deleted_at", null).eq("is_published", true);
            break;

        case "all":
            break;
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw new Response(error.message, { status: 500 });
    return data as Article[];
}

// 1. Menggunakan Helper Generik archiveRecord
export async function archiveArticle(supabase: SupabaseClient, id: string) {
    return archiveRecord(supabase, "articles", id);
}

// 2. Menggunakan Helper Generik restoreRecord
export async function restoreArticle(supabase: SupabaseClient, id: string) {
    return restoreRecord(supabase, "articles", id, { is_published: false });
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
    const contentFile = formData.get("content") as File | null;

    let coverUrl = formData.get("existing_cover") as string;
    let contentUrl = formData.get("existing_content") as string;

    // 3. Menggunakan Helper Generik uploadStorageFile untuk Cover Image
    if (coverFile && coverFile.size > 0) {
        const { url, error } = await uploadStorageFile(supabase, "article_assets", "covers", coverFile);
        if (error) return { error: `Cover Upload Error: ${error}` };
        if (url) coverUrl = url;
    }

    // 4. Menggunakan Helper Generik uploadStorageFile untuk DOCX File
    if (contentFile && contentFile.size > 0) {
        const { url, error } = await uploadStorageFile(supabase, "article_assets", "docs", contentFile);
        if (error) return { error: `Content Upload Error: ${error}` };
        if (url) contentUrl = url;
    }

    if (intent === "create" && (!coverUrl || !contentUrl)) {
        return { error: "Cover image and DOCX content file are required." };
    }

    const payload = {
        title,
        slug: slugify(title), // Tetap pakai slugify yang disentralisasi
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