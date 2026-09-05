import { useState, useEffect } from "react";
import { useFetcher, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/datatable";
import { Button } from "~/components/ui/button";
import { FormDialog } from "~/components/form-dialog";
import { ConfirmDialog } from "~/components/confirm-dialog";
import { ArticleForm } from "~/components/admin/article-form";
import { getArticleColumns } from "~/components/admin/article-columns";
import { createClient } from "~/.server/supabase";
import { getArticlesPage, archiveArticle, restoreArticle, upsertArticle } from "~/.server/services/article";
import type { Article } from "~/models/article";
import type { ComponentProps } from "~/models/route";
import { toast } from "~/components/ui/toast";

export const handle = {
    title: "Published Articles",
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const requestedOffset = Number.parseInt(url.searchParams.get("offset") ?? "0", 10);
    const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;
    const limit = 10;
    const { articles, total } = await getArticlesPage(supabase, "published", { search, offset, limit });
    return { articles, total, offset, limit, search };
}

export async function action({ request }: ActionFunctionArgs) {
    const { supabase } = createClient(request);
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "archive") {
        return archiveArticle(supabase, formData.get("id") as string);
    }

    if (intent === "restore") {
        return restoreArticle(supabase, formData.get("id") as string);
    }

    if (intent === "create" || intent === "update") {
        return upsertArticle(supabase, formData, intent);
    }

    return null;
}

export default function Articles(props: ComponentProps<typeof loader>) {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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
                setSelectedArticle(null);
                setIsAboutToArchive(false);
            }
        }

    }, [fetcher.state, fetcher.data]);

    const submitForm = (formData: FormData) => {
        formData.append("intent", mode || "create");
        const isPublished = formData.get("is_published") === "on";
        formData.set("is_published", String(isPublished));

        if (selectedArticle) {
            formData.append("id", selectedArticle.id);
            formData.append("existing_cover", selectedArticle.cover);
            formData.append("existing_content", selectedArticle.content);
        }

        fetcher.submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        }).then(() => {
            setSuccessMessage(mode === "create" ? "Article created successfully" : "Article updated successfully");
        })
    };

    const archiveItem = () => {
        if (selectedArticle) {
            fetcher.submit({ intent: "archive", id: selectedArticle.id }, { method: "post" })
                .then(() => {
                    setSuccessMessage("Article archived successfully");
                })
        }
    }

    const restoreItem = (article: Article) => {
        fetcher.submit({ intent: "restore", id: article.id }, { method: "post" })
            .then(() => {
                setSuccessMessage("Article restored successfully");
            })
    }

    const columns = getArticleColumns({
        isRestoring: fetcher.state !== 'idle',
        onEdit: (article) => {
            setSelectedArticle(article);
            setMode("update");
        },
        onArchive: (article) => {
            setSelectedArticle(article);
            setIsAboutToArchive(true);
        },
        onRestore: restoreItem
    })

    return (
        <>
            <div className="mb-4 grid lg:flex gap-2">
                <Button
                    onClick={() => {
                        setSelectedArticle(null);
                        setMode("create");
                    }}
                >
                    <Plus /> New Article
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={props.loaderData.articles}
                total={props.loaderData.total}
                offset={props.loaderData.offset}
                limit={props.loaderData.limit}
                search={props.loaderData.search}
            />

            <FormDialog
                isOpen={!!mode}
                title={`${mode} article`}
                description={mode === "create" ? "Create a new article" : "Update an existing article"}
                isSubmitting={fetcher.state === "submitting"}
                onSubmit={submitForm}
                onClose={() => {
                    setMode(undefined);
                    setSelectedArticle(null);
                }}
            >
                <ArticleForm article={selectedArticle} errorMessage={fetcher.data?.error} />
            </FormDialog>

            <ConfirmDialog
                isOpen={isAboutToArchive}
                onConfirm={archiveItem}
                isConfirming={fetcher.state !== 'idle'}
                onAbort={() => {
                    setIsAboutToArchive(false);
                    setSelectedArticle(null);
                }}
                onClose={() => {
                    setIsAboutToArchive(false);
                    setSelectedArticle(null);
                }}
                title="Are you sure you want to archive this article?"
                description="This will set the article as archived. You can restore it later."
            />
        </>
    );
}