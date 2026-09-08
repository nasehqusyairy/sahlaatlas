import { useEffect, useState } from "react";
import { useFetcher, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/datatable";
import { Button } from "~/components/ui/button";
import { FormDialog } from "~/components/form-dialog";
import { ConfirmDialog } from "~/components/confirm-dialog";
import { PhotoForm } from "~/components/admin/photo-form";
import { getPhotoColumns } from "~/components/admin/photo-columns";
import { createClient } from "~/.server/supabase";
import { archivePhoto, getPhotosPage, restorePhoto, upsertPhoto } from "~/.server/services/photo";
import type { Photo } from "~/models/photo";
import type { ComponentProps } from "~/models/route";
import { toast } from "~/components/ui/toast";

export const handle = { title: "Available Photos" };

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const requestedOffset = Number.parseInt(url.searchParams.get("offset") ?? "0", 10);
    const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;
    const limit = 10;
    const { photos, total } = await getPhotosPage(supabase, "active", { search, offset, limit });
    return { photos, total, offset, limit, search };
}

export async function action({ request }: ActionFunctionArgs) {
    const { supabase } = createClient(request);
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "archive") return archivePhoto(supabase, formData.get("id") as string);
    if (intent === "restore") return restorePhoto(supabase, formData.get("id") as string);
    if (intent === "create" || intent === "update") return upsertPhoto(supabase, formData, intent);
    return null;
}

export default function Photos(props: ComponentProps<typeof loader>) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [mode, setMode] = useState<"create" | "update">();
    const [isAboutToArchive, setIsAboutToArchive] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const fetcher = useFetcher<typeof action>();

    useEffect(() => {
        if (fetcher.state !== "idle") return;
        if (fetcher.data?.error) {
            toast.add({ type: "error", title: fetcher.data.error });
        } else if (fetcher.data?.success) {
            toast.add({ type: "success", title: successMessage || "Operation completed successfully" });
            setMode(undefined);
            setSelectedPhoto(null);
            setIsAboutToArchive(false);
        }
    }, [fetcher.state, fetcher.data, successMessage]);

    const submitForm = (formData: FormData) => {
        formData.append("intent", mode || "create");
        if (selectedPhoto) {
            formData.append("id", selectedPhoto.id);
            formData.append("existing_src", selectedPhoto.src);
        }
        fetcher.submit(formData, { method: "post", encType: "multipart/form-data" }).then(() => {
            setSuccessMessage(mode === "create" ? "Photo created successfully" : "Photo updated successfully");
        });
    };

    const archiveItem = () => {
        if (!selectedPhoto) return;
        fetcher.submit({ intent: "archive", id: selectedPhoto.id }, { method: "post" }).then(() => {
            setSuccessMessage("Photo archived successfully");
        });
    };

    const restoreItem = (photo: Photo) => {
        fetcher.submit({ intent: "restore", id: photo.id }, { method: "post" }).then(() => {
            setSuccessMessage("Photo restored successfully");
        });
    };

    const columns = getPhotoColumns({
        isRestoring: fetcher.state !== "idle",
        onEdit: (photo) => { setSelectedPhoto(photo); setMode("update"); },
        onArchive: (photo) => { setSelectedPhoto(photo); setIsAboutToArchive(true); },
        onRestore: restoreItem,
    });

    return (
        <>
            <div className="mb-4 grid lg:flex gap-2">
                <Button onClick={() => { setSelectedPhoto(null); setMode("create"); }}><Plus /> New Photo</Button>
            </div>
            <DataTable columns={columns} data={props.loaderData.photos} total={props.loaderData.total} offset={props.loaderData.offset} limit={props.loaderData.limit} search={props.loaderData.search} />
            <FormDialog
                isOpen={!!mode}
                title={`${mode === "create" ? "Create" : "Edit"} photo`}
                description={mode === "create" ? "Add a new photo to your gallery" : "Update an existing photo"}
                isSubmitting={fetcher.state === "submitting"}
                onSubmit={submitForm}
                onClose={() => { setMode(undefined); setSelectedPhoto(null); }}
            >
                <PhotoForm photo={selectedPhoto} errorMessage={fetcher.data?.error} />
            </FormDialog>
            <ConfirmDialog
                isOpen={isAboutToArchive}
                onConfirm={archiveItem}
                isConfirming={fetcher.state !== "idle"}
                onAbort={() => { setIsAboutToArchive(false); setSelectedPhoto(null); }}
                onClose={() => { setIsAboutToArchive(false); setSelectedPhoto(null); }}
                title="Are you sure you want to archive this photo?"
                description="This will set the photo as archived. You can restore it later."
            />
        </>
    );
}