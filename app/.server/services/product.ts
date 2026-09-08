import type { SupabaseClient } from "@supabase/supabase-js";
import { archiveRecord, restoreRecord, uploadStorageFile } from "./base";
import { normalizeTagNames, syncProductTags } from "./tag";
import type { PaginationOptions } from "~/models/pagination-options";
import type { Product, ProductWithTagLinks } from "~/models/product";

export type ProductStatus = "active" | "archived" | "all";

export async function getProducts(
    supabase: SupabaseClient,
    status: ProductStatus = "active"
) {
    const { products } = await getProductsPage(supabase, status, { limit: null });
    return products;
}

export async function getProductsPage(
    supabase: SupabaseClient,
    status: ProductStatus = "active",
    options: PaginationOptions = {},
) {
    const limit = options.limit === null ? null : Math.min(Math.max(options.limit ?? 10, 1), 100);
    const offset = Math.max(options.offset ?? 0, 0);

    // Tentukan relasi inner/left join berdasarkan filter tag
    const hasTagFilter = (options.tagNames?.length ?? 0) > 0;
    const tagRelation = hasTagFilter
        ? "product_tags!inner(tags!inner(id, name))"
        : "product_tags(tags(id, name))";

    let query = supabase.from("products").select(`
        *,
        ${tagRelation},
        product_discount (
            discounts (*)
        )
    `, { count: "exact" });

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

    if (hasTagFilter) {
        query = query.in("product_tags.tags.name", options.tagNames ?? []);
    }

    query = query.order("created_at", { ascending: false });
    if (limit !== null) query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;
    if (error) throw new Response(error.message, { status: 500 });

    // Format hasil query agar properti `tags` rata berbentuk Tag[]
    const products = (data as ProductWithTagLinks[] ?? []).map((product) => ({
        ...product,
        tags: (product.product_tags ?? [])
            .map((link) => link.tags)
            .filter(Boolean),
    })) as Product[];

    return { products, total: count ?? 0 };
}

export async function archiveProduct(supabase: SupabaseClient, id: string) {
    return archiveRecord(supabase, "products", id);
}

export async function restoreProduct(supabase: SupabaseClient, id: string) {
    return restoreRecord(supabase, "products", id);
}

export async function upsertProduct(
    supabase: SupabaseClient,
    formData: FormData,
    intent: "create" | "update"
) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10) || 0;
    const tags = normalizeTagNames(String(formData.get("tags") ?? ""));

    const imgFile = formData.get("img") as File | null;
    let imgUrl = formData.get("existing_img") as string;

    if (imgFile && imgFile.size > 0) {
        const { url, error } = await uploadStorageFile(supabase, "product_assets", "images", imgFile);
        if (error) return { error: `Image Upload Error: ${error}` };
        if (url) imgUrl = url;
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
        const { data, error } = await supabase
            .from("products")
            .insert([payload])
            .select("id")
            .single();

        if (error) return { error: error.message };

        try {
            await syncProductTags(supabase, data.id, tags);
        } catch (error) {
            return { error: error instanceof Error ? error.message : "Failed to synchronize product tags." };
        }
    } else {
        const { error } = await supabase.from("products").update(payload).eq("id", id);
        if (error) return { error: error.message };

        try {
            await syncProductTags(supabase, id, tags);
        } catch (error) {
            return { error: error instanceof Error ? error.message : "Failed to synchronize product tags." };
        }
    }

    return { success: true };
}