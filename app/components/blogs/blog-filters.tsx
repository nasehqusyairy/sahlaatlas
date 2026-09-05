import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "../ui/combobox";
import { Card, CardContent } from "../ui/card";
import type { Tag } from "~/models/tag";
import { Field, FieldGroup } from "../ui/field";
import { Button } from "../ui/button";

type BlogFiltersProps = {
    searchQuery: string;
    selectedTagNames: string[];
    tags: Tag[];
};

export function BlogFilters({
    searchQuery,
    selectedTagNames,
    tags,
}: BlogFiltersProps) {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [draftTagNames, setDraftTagNames] = useState(selectedTagNames);

    const anchor = useComboboxAnchor()

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.value = searchQuery;
        }
        setDraftTagNames(selectedTagNames);
    }, [searchQuery, selectedTagNames]);

    return (
        <Card>
            <CardContent>
                <Form method="get">
                    <FieldGroup>
                        <Field orientation="responsive">
                            <Input
                                ref={searchInputRef}
                                name="search"
                                placeholder="Find title..."
                                defaultValue={searchQuery}
                                className="min-w-0 flex-1"
                            />
                            <input type="hidden" name="tags" value={draftTagNames.join(",")} />
                            <div className="min-w-0 flex-1">
                                <Combobox
                                    multiple
                                    value={draftTagNames}
                                    onValueChange={setDraftTagNames}
                                    items={tags.map((tag) => tag.name)}
                                >
                                    {/* 2. Attach ref={anchor} to ComboboxChips */}
                                    <ComboboxChips ref={anchor} className="w-full">
                                        <ComboboxValue>
                                            {(values) => (
                                                <React.Fragment>
                                                    {values.map((tagName: string) => (
                                                        <ComboboxChip key={tagName}>
                                                            {tagName}
                                                        </ComboboxChip>
                                                    ))}
                                                    <ComboboxChipsInput
                                                        aria-label="Filter by tag"
                                                        placeholder="Select tags..."
                                                    />
                                                </React.Fragment>
                                            )}
                                        </ComboboxValue>
                                    </ComboboxChips>

                                    {/* 3. Connect ComboboxContent to the anchor */}
                                    <ComboboxContent anchor={anchor}>
                                        <ComboboxList>
                                            <ComboboxEmpty>No tags found.</ComboboxEmpty>
                                            {tags.map((tag) => (
                                                <ComboboxItem key={tag.id} value={tag.name}>
                                                    {tag.name}
                                                </ComboboxItem>
                                            ))}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                            <Button type="submit">
                                <Search /> Search
                            </Button>
                        </Field>
                    </FieldGroup>
                </Form>
            </CardContent>
        </Card>
    );
}
