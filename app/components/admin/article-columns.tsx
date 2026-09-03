import type { ColumnDef } from "@tanstack/react-table";
import { Archive, Pencil, ArchiveRestore, FileText } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import type { Article } from "~/models/article";
import type { features } from "~/components/datatable";

type ColumnActions = {
    onEdit: (article: Article) => void;
    onArchive: (article: Article) => void;
    onRestore: (article: Article) => void;
};

export const getArticleColumns = ({
    onEdit,
    onArchive,
    onRestore,
}: ColumnActions): ColumnDef<typeof features, Article>[] => [
        {
            accessorKey: "cover",
            header: "Cover",
            cell: ({ row }) => (
                <img
                    src={row.original.cover}
                    alt={row.original.title}
                    className="h-10 w-14 object-cover rounded-md border"
                />
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div>
                    <div className="font-semibold">{row.original.title}</div>
                    <div className="text-xs text-muted-foreground">{row.original.slug}</div>
                </div>
            ),
        },
        {
            accessorKey: "author",
            header: "Author",
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
            accessorKey: "deleted_at",
            header: "Status",
            cell: ({ row }) => {
                const isArchived = row.original.deleted_at !== null;
                const isPublished = row.original.is_published;
                return (
                    <Badge variant={isArchived ? "destructive" : isPublished ? "default" : "outline"}>
                        {isArchived ? "Archived" : isPublished ? "Published" : "Draft"}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const article = row.original;
                const isArchived = article.deleted_at !== null;

                return (
                    <div className="flex gap-2">
                        {!isArchived ? (
                            <>
                                <Button size="xs" variant="secondary" onClick={() => onEdit(article)}>
                                    <Pencil /> Edit
                                </Button>
                                <Button size="xs" variant="destructive" onClick={() => onArchive(article)}>
                                    <Archive /> Archive
                                </Button>
                            </>
                        ) : (
                            <Button size="xs" variant="outline" onClick={() => onRestore(article)}>
                                <ArchiveRestore /> Restore
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];