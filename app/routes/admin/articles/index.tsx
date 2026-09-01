import { Plus } from "lucide-react";
import { columns } from "~/components/admin/article-column";
import { DataTable } from "~/components/datatable";
import { Button } from "~/components/ui/button";
import { articles } from "~/models/article";

export const handle = {
    title: 'Articles'
}

export default function Articles() {
    return (
        <>
            <div className="mb-4 grid lg:flex gap-2">
                <Button><Plus />New Article</Button>
            </div>
            <DataTable columns={columns} data={articles} />
        </>
    )
}