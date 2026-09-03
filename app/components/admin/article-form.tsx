import type { Article } from "~/models/article";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

type ArticleFormProps = {
    article?: Article | null;
    errorMessage?: string;
};

export function ArticleForm({ article, errorMessage }: ArticleFormProps) {
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

            {/* Field Cover Image */}
            <Field>
                <Label htmlFor="cover">Cover Image</Label>
                {article?.cover && (
                    <div className="mb-2">
                        <img
                            src={article.cover}
                            alt="Current Cover"
                            className="h-16 w-24 object-cover rounded border"
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