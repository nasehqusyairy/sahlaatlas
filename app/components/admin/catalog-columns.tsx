import type { ColumnDef } from "@tanstack/react-table";
import { Archive, Pencil, ArchiveRestore } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Catalog } from "~/models/catalog";
import type { features } from "~/components/datatable";

export const getCatalogColumns = (arg: {
    onEdit: (catalog: Catalog) => void;
    onArchive: (catalog: Catalog) => void;
    onRestore: (catalog: Catalog) => void;
    isRestoring: boolean;
}): ColumnDef<typeof features, Catalog>[] => [
        {
            accessorKey: "img",
            header: "Image",
            cell: ({ row }) =>
                row.original.img ? (
                    <img
                        loading="lazy"
                        src={row.original.img}
                        alt={row.original.title}
                        className="h-10 w-10 aspect-square object-cover"
                    />
                ) : (
                    <div className="h-10 w-10 bg-muted border flex items-center justify-center text-xs text-muted-foreground">
                        No Image
                    </div>
                ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-foreground">{row.original.title}</p>
                    {row.original.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                            {row.original.description}
                        </p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                }).format(row.original.price);
            },
        },
        {
            accessorKey: "updated_at",
            header: "Last Update",
            cell: ({ row }) => {
                const date = new Date(row.original.updated_at);
                return date.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const catalog = row.original;
                const isArchived = catalog.deleted_at !== null;

                return (
                    <div className="flex gap-2">
                        {!isArchived ? (
                            <>
                                <Button size="xs" variant="secondary" onClick={() => arg.onEdit(catalog)}>
                                    <Pencil /> Edit
                                </Button>
                                <Button size="xs" variant="destructive" onClick={() => arg.onArchive(catalog)}>
                                    <Archive /> Archive
                                </Button>
                            </>
                        ) : (
                            <Button size="xs" variant="outline" disabled={arg.isRestoring} onClick={() => arg.onRestore(catalog)}>
                                <ArchiveRestore /> {arg.isRestoring ? "Restoring..." : "Restore"}
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];