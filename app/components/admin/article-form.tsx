import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export function ArticleForm() {
    return (
        <FieldGroup>
            <Field>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" />
            </Field>
            <Field>
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" />
            </Field>
            <Field>
                <Label htmlFor="content">Content</Label>
                <Input id="content" name="content" type="file" accept=".doc,.docx" />
            </Field>
            <Field>
                <Label htmlFor="is_published">Publish</Label>
                <Switch id="is_published" name="is_published" />
            </Field>
        </FieldGroup>
    )
}