import type { ColumnDef } from "@tanstack/react-table";
import { Archive, Pencil, ArchiveRestore } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Product } from "~/models/product";
import type { features } from "~/components/datatable";

export const getProductColumns = (arg: {
    onEdit: (product: Product) => void;
    onArchive: (product: Product) => void;
    onRestore: (product: Product) => void;
    isRestoring: boolean;
}): ColumnDef<typeof features, Product>[] => [
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
                <p className="font-medium text-foreground line-clamp-2 max-w-xs text-wrap">{row.original.title}</p>
            ),
        },
        {
            accessorKey: "descripton",
            header: "Description",
            cell: ({ row }) => (
                <p className="text-xs text-muted-foreground line-clamp-3 max-w-xs text-wrap">
                    {row.original.description || '-'}
                </p>
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
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const product = row.original;
                const isArchived = product.deleted_at !== null;

                return (
                    <div className="flex gap-2">
                        {!isArchived ? (
                            <>
                                <Button size="xs" variant="secondary" onClick={() => arg.onEdit(product)}>
                                    <Pencil /> Edit
                                </Button>
                                <Button size="xs" variant="destructive" onClick={() => arg.onArchive(product)}>
                                    <Archive /> Archive
                                </Button>
                            </>
                        ) : (
                            <Button size="xs" variant="outline" disabled={arg.isRestoring} onClick={() => arg.onRestore(product)}>
                                <ArchiveRestore /> {arg.isRestoring ? "Restoring..." : "Restore"}
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];