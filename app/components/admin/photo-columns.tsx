import type { ColumnDef } from "@tanstack/react-table";
import { Archive, ArchiveRestore, HelpCircle, Pencil } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Photo } from "~/models/photo";
import type { features } from "~/components/datatable";

export const getPhotoColumns = (arg: {
    onEdit: (photo: Photo) => void;
    onArchive: (photo: Photo) => void;
    onRestore: (photo: Photo) => void;
    isRestoring: boolean;
}): ColumnDef<typeof features, Photo>[] => [
        {
            accessorKey: "src",
            header: "Photo",
            cell: ({ row }) => row.original.src ? (
                <img loading="lazy" src={row.original.src} alt={row.original.title} className="h-12 w-20 object-cover" />
            ) : (
                <div className="h-12 w-20 bg-muted border flex items-center justify-center text-xs text-muted-foreground">
                    <HelpCircle />
                </div>
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <p className="font-medium text-foreground line-clamp-2 max-w-xs text-wrap">{row.original.title}</p>,
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <p className="text-xs text-muted-foreground line-clamp-3 max-w-xs text-wrap">{row.original.description || "-"}</p>,
        },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const photo = row.original;
                const isArchived = photo.deleted_at !== null;

                return (
                    <div className="flex gap-2">
                        {!isArchived ? (
                            <>
                                <Button size="xs" variant="secondary" onClick={() => arg.onEdit(photo)}><Pencil /> Edit</Button>
                                <Button size="xs" variant="destructive" onClick={() => arg.onArchive(photo)}><Archive /> Archive</Button>
                            </>
                        ) : (
                            <Button size="xs" variant="outline" disabled={arg.isRestoring} onClick={() => arg.onRestore(photo)}>
                                <ArchiveRestore /> {arg.isRestoring ? "Restoring..." : "Restore"}
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];