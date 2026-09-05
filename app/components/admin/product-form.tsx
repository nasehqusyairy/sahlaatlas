import type { Product } from "~/models/product";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type ProductFormProps = {
    product?: Product | null;
    errorMessage?: string;
};

export function ProductForm({ product, errorMessage }: ProductFormProps) {
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
                    defaultValue={product?.title}
                    required
                />
            </Field>

            {/* Field Description */}
            {/* <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={product?.description ?? ""}
                    rows={3}
                />
            </Field> */}

            {/* Field Price & Stock */}
            <Field>
                <Label htmlFor="price">Price (Rp)</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1000"
                    defaultValue={product?.price ?? 0}
                    required
                />
            </Field>

            {/* Field Image */}
            <Field>
                <Label htmlFor="img">Product Image</Label>
                {product?.img && (
                    <div className="mb-2">
                        <img
                            src={product.img}
                            alt="Current Product"
                            className="h-16 aspect-square object-cover"
                        />
                    </div>
                )}
                <Input
                    id="img"
                    name="img"
                    type="file"
                    accept="image/*"
                    required={!product?.img}
                />
            </Field>
        </FieldGroup>
    );
}