import type { ColumnDef } from "@tanstack/react-table";
import { Archive, Pencil, ArchiveRestore } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Article } from "~/models/article";
import type { features } from "~/components/datatable";
import { Link } from "react-router";

export const getArticleColumns = (arg: {
    onEdit: (article: Article) => void;
    onArchive: (article: Article) => void;
    onRestore: (article: Article) => void;
    isRestoring: boolean
}): ColumnDef<typeof features, Article>[] => [
        {
            accessorKey: "cover",
            header: "Cover",
            cell: ({ row }) => (
                <img
                    loading="lazy"
                    src={row.original.cover}
                    alt={row.original.title}
                    className="h-10 aspect-video object-cover"
                />
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <Link
                    to={`/blogs/${row.original.slug}`}
                    className="underline text-primary capitalize"
                >
                    {row.original.title}
                </Link>
            )
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
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const article = row.original;
                const isArchived = article.deleted_at !== null;

                return (
                    <div className="flex gap-2">
                        {!isArchived ? (
                            <>
                                <Button size="xs" variant="secondary" onClick={() => arg.onEdit(article)}>
                                    <Pencil /> Edit
                                </Button>
                                <Button size="xs" variant="destructive" onClick={() => arg.onArchive(article)}>
                                    <Archive /> Archive
                                </Button>
                            </>
                        ) : (
                            <Button size="xs" variant="outline" disabled={arg.isRestoring} onClick={() => arg.onRestore(article)}>
                                <ArchiveRestore /> {arg.isRestoring ? 'Restoring...' : 'Restore'}
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];