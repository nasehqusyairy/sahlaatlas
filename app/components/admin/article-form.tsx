import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { Article } from "~/models/article";
import type { Tag } from "~/models/tag";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    useComboboxAnchor,
} from "../ui/combobox";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

type ArticleFormProps = {
    article?: Article | null;
    errorMessage?: string;
};

export function ArticleForm({ article, errorMessage }: ArticleFormProps) {
    const tagsFetcher = useFetcher<{ tags: Tag[] }>();
    const tagsInputRef = useRef<HTMLInputElement>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>(
        () => article?.tags?.map((tag) => tag.name) ?? [],
    );
    const [tagInputValue, setTagInputValue] = useState("");
    const articleId = article?.id ?? "new";

    const anchor = useComboboxAnchor()

    const tagItems = tagsFetcher.data?.tags?.map((tag) => tag.name) ?? []
    const rawTags = tagsFetcher.data?.tags ?? []

    useEffect(() => {
        if (tagsFetcher.state === "idle" && !tagsFetcher.data) {
            tagsFetcher.load("/tags");
        }
    }, [tagsFetcher]);

    useEffect(() => {
        setSelectedTags(article?.tags?.map((tag) => tag.name) ?? []);
        setTagInputValue("");
    }, [articleId]);

    useEffect(() => {
        if (tagsInputRef.current) {
            tagsInputRef.current.value = selectedTags.join(", ");
        }
    }, [selectedTags]);

    const addTagFromInput = (tag: string) => {
        if (!tag) {
            return;
        }
        setSelectedTags((currentTags) => currentTags.includes(tag) ? currentTags : [...currentTags, tag]);
    };

    return (
        <FieldGroup className="gap-4 py-2">
            {errorMessage && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                    {errorMessage}
                </div>
            )}

            {/* Field Title */}
            <Field>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    defaultValue={article?.title}
                    required
                />
            </Field>

            {/* Field Author */}
            <Field>
                <Label htmlFor="author">Author</Label>
                <Input
                    id="author"
                    name="author"
                    defaultValue={article?.author}
                    required
                />
            </Field>

            <Field>
                <Label htmlFor="tags">Tags</Label>
                <input
                    ref={tagsInputRef}
                    id="tags"
                    name="tags"
                    type="hidden"
                    defaultValue={article?.tags?.map((tag) => tag.name).join(", ")}
                />
                <Combobox
                    multiple
                    value={selectedTags}
                    onValueChange={(value) => setSelectedTags(value)}
                    inputValue={tagInputValue}
                    onInputValueChange={setTagInputValue}
                    items={tagItems}
                >
                    {/* 2. Pasang ref={anchor} di sini */}
                    <ComboboxChips ref={anchor}>
                        {selectedTags.map((tag) => (
                            <ComboboxChip key={tag}>
                                {tag}
                            </ComboboxChip>
                        ))}
                        <ComboboxChipsInput
                            aria-label="Add article tags"
                            placeholder="Ketik tag lalu tekan koma"
                            onKeyDown={(event) => {
                                if (event.key === ",") {
                                    event.preventDefault()
                                    const trimmed = tagInputValue.trim().replace(/,/g, "")
                                    if (trimmed) {
                                        addTagFromInput(trimmed)
                                        setTagInputValue("")
                                    }
                                }
                            }}
                        />
                    </ComboboxChips>

                    {/* 3. Hubungkan Content ke anchor agar lebarnya persis 100% mengikuti ComboboxChips */}
                    <ComboboxContent anchor={anchor}>
                        <ComboboxList>
                            <ComboboxEmpty>Tag tidak ditemukan.</ComboboxEmpty>
                            {rawTags.map((tag) => (
                                <ComboboxItem key={tag.id} value={tag.name}>
                                    {tag.name}
                                </ComboboxItem>
                            ))}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </Field>

            {/* Field Cover Image */}
            <Field>
                <Label htmlFor="cover">Cover Image</Label>
                {article?.cover && (
                    <div className="mb-2">
                        <img
                            src={article.cover}
                            alt="Current Cover"
                            className="h-12 aspect-video object-cover"
                        />
                    </div>
                )}
                <Input
                    id="cover"
                    name="cover"
                    type="file"
                    accept="image/*"
                    required={!article?.cover}
                />
            </Field>

            {/* Field Content File (.docx) */}
            <Field>
                <Label htmlFor="content">Content (.docx)</Label>
                {article?.content && (
                    <p className="text-xs text-muted-foreground mb-1">
                        Current :{" "}
                        <a href={article.content} target="_blank" rel="noreferrer" className="underline font-medium">
                            {article.content.split('/').at(-1)}
                        </a>
                    </p>
                )}
                <Input
                    id="content"
                    name="content"
                    type="file"
                    accept=".doc,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required={!article?.content}
                />
            </Field>

            {/* Field Publish Switch */}
            <Field>
                <Label htmlFor="is_published">Publish</Label>
                <Switch
                    id="is_published"
                    name="is_published"
                    defaultChecked={article?.is_published ?? false}
                />
            </Field>
        </FieldGroup>
    );
}