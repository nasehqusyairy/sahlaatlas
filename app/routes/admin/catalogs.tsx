import { useState, useEffect } from "react";
import { useFetcher, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/datatable";
import { Button } from "~/components/ui/button";
import { FormDialog } from "~/components/form-dialog";
import { ConfirmDialog } from "~/components/confirm-dialog";
import { CatalogForm } from "~/components/admin/catalog-form";
import { getCatalogColumns } from "~/components/admin/catalog-columns";
import { createClient } from "~/.server/supabase";
import { getCatalogs, archiveCatalog, restoreCatalog, upsertCatalog } from "~/.server/services/catalog";
import type { Catalog } from "~/models/catalog";
import type { ComponentProps } from "~/models/route";
import { toast } from "~/components/ui/toast";

export const handle = {
    title: "Available Catalogs",
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const catalogs = await getCatalogs(supabase, "active");
    return { catalogs };
}

export async function action({ request }: ActionFunctionArgs) {
    const { supabase } = createClient(request);
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "archive") {
        return archiveCatalog(supabase, formData.get("id") as string);
    }

    if (intent === "restore") {
        return restoreCatalog(supabase, formData.get("id") as string);
    }

    if (intent === "create" || intent === "update") {
        return upsertCatalog(supabase, formData, intent);
    }

    return null;
}

export default function Catalogs(props: ComponentProps<typeof loader>) {
    const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
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
                setSelectedCatalog(null);
                setIsAboutToArchive(false);
            }
        }
    }, [fetcher.state, fetcher.data]);

    const submitForm = (formData: FormData) => {
        formData.append("intent", mode || "create");

        if (selectedCatalog) {
            formData.append("id", selectedCatalog.id);
            formData.append("existing_img", selectedCatalog.img || "");
        }

        fetcher.submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        }).then(() => {
            setSuccessMessage(mode === "create" ? "Catalog item created successfully" : "Catalog item updated successfully");
        })
    };

    const archiveItem = () => {
        if (selectedCatalog) {
            fetcher.submit({ intent: "archive", id: selectedCatalog.id }, { method: "post" })
                .then(() => {
                    setSuccessMessage("Catalog item archived successfully");
                })
        }
    };

    const restoreItem = (catalog: Catalog) => {
        fetcher.submit({ intent: "restore", id: catalog.id }, { method: "post" })
            .then(() => {
                setSuccessMessage("Catalog item restored successfully");
            })
    };

    const columns = getCatalogColumns({
        isRestoring: fetcher.state !== "idle",
        onEdit: (catalog) => {
            setSelectedCatalog(catalog);
            setMode("update");
        },
        onArchive: (catalog) => {
            setSelectedCatalog(catalog);
            setIsAboutToArchive(true);
        },
        onRestore: restoreItem,
    });

    return (
        <>
            <div className="mb-4 grid lg:flex gap-2">
                <Button
                    onClick={() => {
                        setSelectedCatalog(null);
                        setMode("create");
                    }}
                >
                    <Plus /> New Item
                </Button>
            </div>

            <DataTable columns={columns} data={props.loaderData.catalogs} />

            <FormDialog
                isOpen={!!mode}
                title={`${mode === "create" ? "Create" : "Edit"} catalog item`}
                description={mode === "create" ? "Add a new item to your catalog" : "Update an existing catalog item"}
                isSubmitting={fetcher.state === "submitting"}
                onSubmit={submitForm}
                onClose={() => {
                    setMode(undefined);
                    setSelectedCatalog(null);
                }}
            >
                <CatalogForm catalog={selectedCatalog} errorMessage={fetcher.data?.error} />
            </FormDialog>

            <ConfirmDialog
                isOpen={isAboutToArchive}
                onConfirm={archiveItem}
                isConfirming={fetcher.state !== "idle"}
                onAbort={() => {
                    setIsAboutToArchive(false);
                    setSelectedCatalog(null);
                }}
                onClose={() => {
                    setIsAboutToArchive(false);
                    setSelectedCatalog(null);
                }}
                title="Are you sure you want to archive this item?"
                description="This will set the item as archived. You can restore it later."
            />
        </>
    );
}