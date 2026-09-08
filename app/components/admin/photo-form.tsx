import type { Photo } from "~/models/photo";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type PhotoFormProps = {
    photo?: Photo | null;
    errorMessage?: string;
};

export function PhotoForm({ photo, errorMessage }: PhotoFormProps) {
    const createdAt = photo?.created_at
        ? new Date(photo.created_at).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16);

    return (
        <FieldGroup className="gap-4 py-2">
            {errorMessage && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                    {errorMessage}
                </div>
            )}

            <Field>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={photo?.title} required />
            </Field>

            <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={photo?.description ?? ""} rows={3} />
            </Field>

            <Field>
                <Label htmlFor="created_at">Created At</Label>
                <Input id="created_at" name="created_at" type="datetime-local" defaultValue={createdAt} required />
            </Field>

            <Field>
                <Label htmlFor="src">Photo</Label>
                {photo?.src && (
                    <div className="mb-2">
                        <img src={photo.src} alt="Current photo" className="h-20 aspect-video object-cover" />
                    </div>
                )}
                <Input id="src" name="src" type="file" accept="image/*" required={!photo?.src} />
            </Field>
        </FieldGroup>
    );
}