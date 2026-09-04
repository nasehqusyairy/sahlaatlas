import type { SupabaseClient } from "@supabase/supabase-js";

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Helper Generik untuk Soft Delete (Archive)
export async function archiveRecord(
    supabase: SupabaseClient,
    table: string,
    id: string
) {
    const { error } = await supabase
        .from(table)
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);

    console.log({ error });

    return error ? { error: error.message } : { success: true };
}

// Helper Generik untuk Restore
export async function restoreRecord(
    supabase: SupabaseClient,
    table: string,
    id: string,
    extraFields: Record<string, unknown> = {}
) {
    const { error } = await supabase
        .from(table)
        .update({ deleted_at: null, ...extraFields })
        .eq("id", id);

    return error ? { error: error.message } : { success: true };
}

// Helper Generik untuk Upload File ke Supabase Storage
export async function uploadStorageFile(
    supabase: SupabaseClient,
    bucket: string,
    folder: string,
    file: File
): Promise<{ url?: string; error?: string }> {
    if (!file || file.size === 0) return {};

    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const path = `${folder}/${timestamp}_${slugify(file.name.replace(`.${ext}`, ""))}.${ext}`;

    const { error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: true });

    if (uploadErr) return { error: uploadErr.message };

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return { url: data.publicUrl };
}