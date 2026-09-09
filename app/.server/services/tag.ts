import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "~/lib/utils";
import type { Tag } from "~/models/tag";

export function normalizeTagNames(value: string) {
    return [...new Set(
        value
            .split(",")
            .map((tag) => slugify(tag))
            .filter(Boolean),
    )];
}

export async function getTags(supabase: SupabaseClient) {
    const { data, error } = await supabase
        .from("tags")
        .select("id, name")
        .order("name");

    if (error) throw new Response(error.message, { status: 500 });
    return data as Tag[];
}

export async function syncArticleTags(
    supabase: SupabaseClient,
    articleId: string,
    tagNames: string[],
) {
    const normalizedNames = [...new Set(tagNames.map((tag) => slugify(tag)).filter(Boolean))];
    const existingTags = normalizedNames.length
        ? await supabase.from("tags").select("id, name").in("name", normalizedNames)
        : { data: [], error: null };

    if (existingTags.error) throw new Error(existingTags.error.message);

    const knownNames = new Set((existingTags.data ?? []).map((tag) => tag.name));
    const missingNames = normalizedNames.filter((name) => !knownNames.has(name));

    if (missingNames.length) {
        const { error } = await supabase
            .from("tags")
            .upsert(missingNames.map((name) => ({ name })), { onConflict: "name", ignoreDuplicates: true });

        if (error) throw new Error(error.message);
    }

    const tags = normalizedNames.length
        ? await supabase.from("tags").select("id, name").in("name", normalizedNames)
        : { data: [], error: null };

    if (tags.error) throw new Error(tags.error.message);

    const desiredTagIds = (tags.data ?? []).map((tag) => tag.id);
    const { data: currentLinks, error: linksError } = await supabase
        .from("article_tag")
        .select("tag_id")
        .eq("article_id", articleId);

    if (linksError) throw new Error(linksError.message);

    const desiredIds = new Set(desiredTagIds);
    const staleTagIds = (currentLinks ?? [])
        .map((link) => link.tag_id)
        .filter((tagId) => !desiredIds.has(tagId));

    for (const tagId of staleTagIds) {
        const { error } = await supabase
            .from("article_tag")
            .delete()
            .eq("article_id", articleId)
            .eq("tag_id", tagId);

        if (error) throw new Error(error.message);
    }

    const currentTagIds = new Set((currentLinks ?? []).map((link) => link.tag_id));
    const newLinks = desiredTagIds
        .filter((tagId) => !currentTagIds.has(tagId))
        .map((tagId) => ({ article_id: articleId, tag_id: tagId }));

    if (newLinks.length) {
        const { error } = await supabase.from("article_tag").insert(newLinks);
        if (error) throw new Error(error.message);
    }
}

// Contoh implementasi syncProductTags (misal dimasukkan ke tag.ts)
export async function syncProductTags(
    supabase: SupabaseClient,
    productId: string,
    tagNames: string[]
) {
    // 1. Dapatkan atau buat tag yang belum ada
    const tagIds: string[] = [];
    for (const name of tagNames) {
        let { data: tag } = await supabase
            .from("tags")
            .select("id")
            .eq("name", name)
            .maybeSingle();

        if (!tag) {
            const { data: newTag, error } = await supabase
                .from("tags")
                .insert({ name })
                .select("id")
                .single();
            if (error) throw error;
            tag = newTag;
        }
        tagIds.push(tag.id);
    }

    // 2. Hapus relasi tag lama untuk produk ini
    await supabase.from("product_tags").delete().eq("product_id", productId);

    // 3. Insert relasi tag baru
    if (tagIds.length > 0) {
        const productTags = tagIds.map((tagId) => ({
            product_id: productId,
            tag_id: tagId,
        }));
        const { error } = await supabase.from("product_tags").insert(productTags);
        if (error) throw error;
    }
}