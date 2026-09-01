import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Archive, Pencil } from "lucide-react";
import type { Article } from "~/models/article";
import type { ColumnDef } from "@tanstack/react-table";
import { features } from "../datatable";

export const columns: ColumnDef<typeof features, Article>[] = [
    {
        accessorKey: "title",
    },
    {
        accessorKey: "author",
    },
    {
        accessorKey: "updated_at",
        header: "Last Update",
        cell: ({ row }) => {
            const date = new Date(row.getValue("updated_at"));
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
            const isArchived = row.getValue("deleted_at") !== null;
            const isPublished = row.original.is_published
            return (
                <Badge variant={isArchived ? "destructive" : isPublished ? "default" : "outline"}>
                    {isArchived ? "Archived" : isPublished ? "Published" : "Draft"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: 'Actions',
        cell: ({ row }) => {
            const article = row.original;

            return (
                <div className="flex gap-2">
                    <Button size={'xs'} variant={'secondary'}><Pencil />Edit</Button>
                    <Button size={'xs'} variant={'destructive'}><Archive />Archive</Button>
                </div>
            );
        },
    },
];

