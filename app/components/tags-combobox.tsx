import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
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
} from "./ui/combobox";
import { Field } from "./ui/field";
import { Label } from "./ui/label";

type TagsComboboxProps = {
    /** Nilai awal tag (array of string/nama tag) */
    defaultTags?: string[];
    /** URL endpoint fetcher untuk mengambil data tags. Default: "/tags" */
    fetchUrl?: string;
    /** Nama atribut input hidden untuk kebutuhan form submit. Default: "tags" */
    name?: string;
    /** Label field. Default: "Tags" */
    label?: string;
};

export function TagsCombobox({
    defaultTags = [],
    fetchUrl = "/tags",
    name = "tags",
    label = "Tags",
}: TagsComboboxProps) {
    const tagsFetcher = useFetcher<{ tags: Tag[] }>();
    const tagsInputRef = useRef<HTMLInputElement>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>(defaultTags);
    const [tagInputValue, setTagInputValue] = useState("");

    const anchor = useComboboxAnchor();

    const tagItems = tagsFetcher.data?.tags?.map((tag) => tag.name) ?? [];
    const rawTags = tagsFetcher.data?.tags ?? [];

    // Mengambil data tag dari endpoint jika belum ada
    useEffect(() => {
        if (tagsFetcher.state === "idle" && !tagsFetcher.data) {
            tagsFetcher.load(fetchUrl);
        }
    }, [tagsFetcher, fetchUrl]);

    // Sinkronisasi nilai defaultTags jika berubah dari parent
    useEffect(() => {
        setSelectedTags(defaultTags);
        setTagInputValue("");
    }, [JSON.stringify(defaultTags)]);

    // Update value pada hidden input saat selectedTags berubah
    useEffect(() => {
        if (tagsInputRef.current) {
            tagsInputRef.current.value = selectedTags.join(", ");
        }
    }, [selectedTags]);

    const addTagFromInput = (tag: string) => {
        if (!tag) return;
        setSelectedTags((currentTags) =>
            currentTags.includes(tag) ? currentTags : [...currentTags, tag],
        );
    };

    return (
        <Field>
            <Label htmlFor={name}>{label}</Label>
            <input
                ref={tagsInputRef}
                id={name}
                name={name}
                type="hidden"
                defaultValue={defaultTags.join(", ")}
            />
            <Combobox
                multiple
                value={selectedTags}
                onValueChange={(value) => setSelectedTags(value)}
                inputValue={tagInputValue}
                onInputValueChange={setTagInputValue}
                items={tagItems}
            >
                <ComboboxChips ref={anchor}>
                    {selectedTags.map((tag) => (
                        <ComboboxChip key={tag}>{tag}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput
                        aria-label={`Add ${label.toLowerCase()}`}
                        placeholder="Type a tag, then press comma"
                        onKeyDown={(event) => {
                            if (event.key === ",") {
                                event.preventDefault();
                                const trimmed = tagInputValue.trim().replace(/,/g, "");
                                if (trimmed) {
                                    addTagFromInput(trimmed);
                                    setTagInputValue("");
                                }
                            }
                        }}
                    />
                </ComboboxChips>

                <ComboboxContent anchor={anchor}>
                    <ComboboxList>
                        <ComboboxEmpty>No tags found.</ComboboxEmpty>
                        {rawTags.map((tag) => (
                            <ComboboxItem key={tag.id} value={tag.name}>
                                {tag.name}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </Field>
    );
}