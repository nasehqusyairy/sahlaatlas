import type { SupabaseClient } from "@supabase/supabase-js";
import { archiveRecord, restoreRecord, uploadStorageFile } from "./base";
import type { PaginationOptions } from "~/models/pagination-options";
import type { Photo } from "~/models/photo";

export type PhotoStatus = "active" | "archived" | "all";

export async function getPhotosPage(
    supabase: SupabaseClient,
    status: PhotoStatus = "active",
    options: PaginationOptions = {},
) {
    const limit = options.limit === null ? null : Math.min(Math.max(options.limit ?? 10, 1), 100);
    const offset = Math.max(options.offset ?? 0, 0);

    let query = supabase.from("photos").select("*", { count: "exact" });

    switch (status) {
        case "archived":
            query = query.not("deleted_at", "is", null);
            break;
        case "active":
            query = query.is("deleted_at", null);
            break;
        case "all":
            break;
    }

    if (options.search?.trim()) {
        const search = options.search.trim().replace(/[\\%_]/g, "\\$&");
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    query = query.order("created_at", { ascending: false });
    if (limit !== null) query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;
    if (error) throw new Response(error.message, { status: 500 });

    return { photos: (data ?? []) as Photo[], total: count ?? 0 };
}

export async function archivePhoto(supabase: SupabaseClient, id: string) {
    return archiveRecord(supabase, "photos", id);
}

export async function restorePhoto(supabase: SupabaseClient, id: string) {
    return restoreRecord(supabase, "photos", id);
}

export async function upsertPhoto(
    supabase: SupabaseClient,
    formData: FormData,
    intent: "create" | "update",
) {
    const id = formData.get("id") as string;
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim() || null;
    const createdAt = String(formData.get("created_at") ?? "");
    const imageFile = formData.get("src") as File | null;
    let src = String(formData.get("existing_src") ?? "");

    if (!createdAt || Number.isNaN(new Date(createdAt).getTime())) {
        return { error: "A valid creation date is required." };
    }

    if (imageFile && imageFile.size > 0) {
        const { url, error } = await uploadStorageFile(supabase, "photo_assets", "images", imageFile);
        if (error) return { error: `Image Upload Error: ${error}` };
        if (url) src = url;
    }

    if (intent === "create" && !src) {
        return { error: "An image is required." };
    }

    const payload = {
        title,
        description,
        src,
        created_at: new Date(createdAt).toISOString(),
        updated_at: new Date().toISOString(),
    };

    const query = intent === "create"
        ? supabase.from("photos").insert([payload])
        : supabase.from("photos").update(payload).eq("id", id);
    const { error } = await query;

    return error ? { error: error.message } : { success: true };
}