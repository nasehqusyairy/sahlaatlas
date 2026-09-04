import type { SupabaseClient } from "@supabase/supabase-js";
import { archiveRecord, restoreRecord, uploadStorageFile } from "./base";

export type CatalogStatus = "active" | "archived" | "all";

export type Catalog = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    stock: number;
    img: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export async function getCatalogs(
    supabase: SupabaseClient,
    status: CatalogStatus = "active"
) {
    let query = supabase.from("catalogs").select(`
        *,
        catalog_discounts (
            discounts (*)
        )
    `);

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

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw new Response(error.message, { status: 500 });
    return data;
}

export async function archiveCatalog(supabase: SupabaseClient, id: string) {
    return archiveRecord(supabase, "catalogs", id);
}

export async function restoreCatalog(supabase: SupabaseClient, id: string) {
    return restoreRecord(supabase, "catalogs", id);
}

export async function upsertCatalog(
    supabase: SupabaseClient,
    formData: FormData,
    intent: "create" | "update"
) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10) || 0;

    const imgFile = formData.get("img") as File | null;
    let imgUrl = formData.get("existing_img") as string;

    if (imgFile && imgFile.size > 0) {
        const { url, error } = await uploadStorageFile(supabase, "catalog_assets", "images", imgFile);
        if (error) return { error: `Image Upload Error: ${error}` };
        if (url) imgUrl = url;
    }

    if (intent === "create" && !imgUrl) {
        return { error: "Gambar katalog wajib diisi." };
    }

    const payload = {
        title,
        description,
        price,
        stock,
        img: imgUrl,
        updated_at: new Date().toISOString(),
    };

    if (intent === "create") {
        const { error } = await supabase.from("catalogs").insert([payload]);
        if (error) return { error: error.message };
    } else {
        const { error } = await supabase.from("catalogs").update(payload).eq("id", id);
        if (error) return { error: error.message };
    }

    return { success: true };
}