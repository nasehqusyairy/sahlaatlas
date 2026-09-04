import type { SupabaseClient } from "@supabase/supabase-js";
import { archiveRecord, restoreRecord } from "./base";

export type DiscountStatus = "active" | "archived" | "all";

export type Discount = {
    id: string;
    title: string;
    description: string | null;
    type: "percentage" | "fixed";
    value: number;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export async function getDiscounts(
    supabase: SupabaseClient,
    status: DiscountStatus = "active"
) {
    let query = supabase.from("discounts").select("*");

    switch (status) {
        case "archived":
            query = query.not("deleted_at", "is", null);
            break;
        case "active":
            query = query.is("deleted_at", null)
            break;
        case "all":
            break;
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw new Response(error.message, { status: 500 });
    return data as Discount[];
}

export async function archiveDiscount(supabase: SupabaseClient, id: string) {
    return archiveRecord(supabase, "discounts", id);
}

export async function restoreDiscount(supabase: SupabaseClient, id: string) {
    return restoreRecord(supabase, "discounts", id);
}

export async function upsertDiscount(
    supabase: SupabaseClient,
    formData: FormData,
    intent: "create" | "update"
) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || null;
    const type = formData.get("type") as "percentage" | "fixed";
    const value = parseFloat(formData.get("value") as string);
    const start_at = formData.get("start_at") as string;
    const end_at = formData.get("end_at") as string;
    const productIds = formData.getAll("product_ids") as string[];

    const payload = {
        title,
        description,
        type,
        value,
        start_at,
        end_at,
        updated_at: new Date().toISOString(),
    };

    let discountId = id;

    if (intent === "create") {
        const { data, error } = await supabase.from("discounts").insert([payload]).select("id").single();
        if (error) return { error: error.message };
        discountId = data.id;
    } else {
        const { error } = await supabase.from("discounts").update(payload).eq("id", id);
        if (error) return { error: error.message };
    }

    // Mengelola Relasi Many-to-Many pada tabel product_discounts
    if (productIds && productIds.length > 0) {
        // Hapus relasi lama jika sedang update
        if (intent === "update") {
            await supabase.from("product_discounts").delete().eq("discount_id", discountId);
        }

        // Insert relasi baru
        const relations = productIds.map((product_id) => ({
            product_id,
            discount_id: discountId,
        }));

        const { error: relErr } = await supabase.from("product_discounts").insert(relations);
        if (relErr) return { error: `Gagal memperbarui relasi produk: ${relErr.message}` };
    }

    return { success: true };
}