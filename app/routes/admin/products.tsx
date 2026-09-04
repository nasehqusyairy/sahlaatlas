import { useState, useEffect } from "react";
import { useFetcher, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/datatable";
import { Button } from "~/components/ui/button";
import { FormDialog } from "~/components/form-dialog";
import { ConfirmDialog } from "~/components/confirm-dialog";
import { ProductForm } from "~/components/admin/product-form";
import { getProductColumns } from "~/components/admin/product-columns";
import { createClient } from "~/.server/supabase";
import { getProducts, archiveProduct, restoreProduct, upsertProduct } from "~/.server/services/product";
import type { Product } from "~/models/product";
import type { ComponentProps } from "~/models/route";
import { toast } from "~/components/ui/toast";

export const handle = {
    title: "Available Products",
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const products = await getProducts(supabase, "active");

    return { products };
}

export async function action({ request }: ActionFunctionArgs) {
    const { supabase } = createClient(request);
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "archive") {
        return archiveProduct(supabase, formData.get("id") as string);
    }

    if (intent === "restore") {
        return restoreProduct(supabase, formData.get("id") as string);
    }

    if (intent === "create" || intent === "update") {
        return upsertProduct(supabase, formData, intent);
    }

    return null;
}

export default function Products(props: ComponentProps<typeof loader>) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [mode, setMode] = useState<"create" | "update" | undefined>();
    const [isAboutToArchive, setIsAboutToArchive] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetcher = useFetcher<typeof action>();

    useEffect(() => {
        if (fetcher.state === "idle") {
            if (fetcher.data?.error) {
                toast.add({
                    type: "error",
                    title: fetcher.data.error || "An error occurred while processing your request.",
                });
            } else if (fetcher.data?.success) {
                toast.add({
                    type: "success",
                    title: successMessage || "Operation completed successfully",
                })
                setMode(undefined);
                setSelectedProduct(null);
                setIsAboutToArchive(false);
            }
        }
    }, [fetcher.state, fetcher.data]);

    const submitForm = (formData: FormData) => {
        formData.append("intent", mode || "create");

        if (selectedProduct) {
            formData.append("id", selectedProduct.id);
            formData.append("existing_img", selectedProduct.img || "");
        }

        fetcher.submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        }).then(() => {
            setSuccessMessage(mode === "create" ? "Product item created successfully" : "Product item updated successfully");
        })
    };

    const archiveItem = () => {
        if (selectedProduct) {
            fetcher.submit({ intent: "archive", id: selectedProduct.id }, { method: "post" })
                .then(() => {
                    setSuccessMessage("Product item archived successfully");
                })
        }
    };

    const restoreItem = (product: Product) => {
        fetcher.submit({ intent: "restore", id: product.id }, { method: "post" })
            .then(() => {
                setSuccessMessage("Product item restored successfully");
            })
    };

    const columns = getProductColumns({
        isRestoring: fetcher.state !== "idle",
        onEdit: (product) => {
            setSelectedProduct(product);
            setMode("update");
        },
        onArchive: (product) => {
            setSelectedProduct(product);
            setIsAboutToArchive(true);
        },
        onRestore: restoreItem,
    });

    return (
        <>
            <div className="mb-4 grid lg:flex gap-2">
                <Button
                    onClick={() => {
                        setSelectedProduct(null);
                        setMode("create");
                    }}
                >
                    <Plus /> New Item
                </Button>
            </div>

            <DataTable columns={columns} data={props.loaderData.products} />

            <FormDialog
                isOpen={!!mode}
                title={`${mode === "create" ? "Create" : "Edit"} product item`}
                description={mode === "create" ? "Add a new item to your product list" : "Update an existing product item"}
                isSubmitting={fetcher.state === "submitting"}
                onSubmit={submitForm}
                onClose={() => {
                    setMode(undefined);
                    setSelectedProduct(null);
                }}
            >
                <ProductForm product={selectedProduct} errorMessage={fetcher.data?.error} />
            </FormDialog>

            <ConfirmDialog
                isOpen={isAboutToArchive}
                onConfirm={archiveItem}
                isConfirming={fetcher.state !== "idle"}
                onAbort={() => {
                    setIsAboutToArchive(false);
                    setSelectedProduct(null);
                }}
                onClose={() => {
                    setIsAboutToArchive(false);
                    setSelectedProduct(null);
                }}
                title="Are you sure you want to archive this item?"
                description="This will set the item as archived. You can restore it later."
            />
        </>
    );
}