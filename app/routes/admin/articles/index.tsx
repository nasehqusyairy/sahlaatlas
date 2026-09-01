import { ArchiveRestore, Plus } from "lucide-react";
import { DataTable, features } from "~/components/datatable";
import { Button } from "~/components/ui/button";
import { articles } from "~/models/article";
import { Badge } from "~/components/ui/badge";
import { Archive, Pencil } from "lucide-react";
import type { Article } from "~/models/article";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { FormDialog } from "~/components/form-dialog";
import { ArticleForm } from "~/components/admin/article-form";
import type { ComponentProps } from "~/models/route";
import { useFetcher, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { ConfirmDialog } from "~/components/confirm-dialog";

export const handle = {
    title: 'Articles'
}

export async function action(args: ActionFunctionArgs) {

}

export async function loader(args: LoaderFunctionArgs) {
    return { articles }
}

export default function Articles(props: ComponentProps<typeof loader>) {

    const [mode, setMode] = useState<'create' | 'update' | undefined>('create');
    const [isAboutToArchive, setIsAboutToArchive] = useState(false);

    const fetcher = useFetcher();

    const onSubmit = () => {

    }

    const columns: ColumnDef<typeof features, Article>[] = [
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
                return (
                    <div className="flex gap-2">
                        {row.original.deleted_at === null ? (
                            <>
                                <Button size={'xs'} variant={'secondary'} onClick={() => setMode('update')}><Pencil />Edit</Button>
                                <Button size={'xs'} variant={'destructive'} onClick={() => setIsAboutToArchive(true)}><Archive />Archive</Button>
                            </>
                        ) : (
                            <Button size={'xs'} variant={'outline'}><ArchiveRestore />Restore</Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div className="mb-4 grid lg:flex gap-2">
                <Button onClick={() => setMode('create')}><Plus />New Article</Button>
            </div>
            <DataTable columns={columns} data={props.loaderData.articles} />
            <FormDialog
                isOpen={!!mode}
                title={`${mode} article`}
                description={mode === 'create' ? 'Create a new article' : 'Update an existing article'}
                isSubmitting={fetcher.state === 'submitting'}
                onSubmit={onSubmit}
                onClose={() => setMode(undefined)}>
                <ArticleForm />
            </FormDialog >
            <ConfirmDialog
                isOpen={isAboutToArchive}
                onConfirm={() => {
                    // Handle archive confirmation
                }}
                onAbort={() => {
                    setIsAboutToArchive(false)
                }}
                onClose={() => setIsAboutToArchive(false)}
                title="Are you sure you want to archive this article?"
                description="You can restore this article later from the archive. This action cannot be undone."
            />
        </>
    )
}