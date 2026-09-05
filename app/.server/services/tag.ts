import type { SupabaseClient } from "@supabase/supabase-js";
import type { Tag } from "~/models/tag";
import { slugify } from "./base";

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
