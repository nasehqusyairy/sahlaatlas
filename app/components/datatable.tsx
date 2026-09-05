import { useEffect, useState } from "react";
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";

import {
    columnFilteringFeature,
    columnVisibilityFeature,
    createFilteredRowModel,
    createSortedRowModel,
    filterFn_includesString,
    rowSelectionFeature,
    rowSortingFeature,
    sortFn_alphanumeric,
    sortFn_text,
    tableFeatures,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { Search } from "lucide-react"
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Field, FieldGroup } from "./ui/field";
import { Form, useSearchParams } from "react-router";
import { Input } from "./ui/input";

export const features = tableFeatures({
    columnFilteringFeature,
    columnVisibilityFeature,
    rowSelectionFeature,
    rowSortingFeature,
    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    filterFns: { includesString: filterFn_includesString },
    sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

type DataTableProps<TData extends RowData> = {
    columns: ColumnDef<typeof features, TData>[]
    data: TData[]
    total: number
    offset: number
    limit: number
    search: string
}

export function DataTable<TData extends RowData>({
    columns,
    data,
    total,
    offset,
    limit,
    search,
}: DataTableProps<TData>) {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateTableQuery = (values: { search?: string; offset?: number }) => {
        const next = new URLSearchParams(searchParams);
        if (values.search?.trim()) next.set("search", values.search.trim());
        else if (values.search !== undefined) next.delete("search");
        if (values.offset !== undefined) next.set("offset", String(values.offset));
        setSearchParams(next, { replace: true });
    };

    const table = useTable<typeof features, TData>({
        features,
        data,
        columns,
    })

    return (
        <>
            <Card>
                <CardContent>
                    <div className="mb-4 grid lg:flex gap-2 lg:justify-end">
                        <Form
                            className="lg:max-w-sm w-full"
                            onSubmit={(event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                updateTableQuery({
                                    search: String(formData.get("search") ?? ""),
                                    offset: 0,
                                });
                            }}
                        >
                            <FieldGroup>
                                <Field orientation={'horizontal'}>
                                    <Input name="search" placeholder="Search..." defaultValue={search} />
                                    <Button size={'icon'} type="submit"><Search /></Button>
                                </Field>
                            </FieldGroup>
                        </Form>
                    </div>
                    <div className="overflow-hidden border mb-4">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder ? null : (
                                                        <table.FlexRender header={header} />
                                                    )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    <table.FlexRender cell={cell} />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="py-4 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateTableQuery({ offset: Math.max(offset - limit, 0) })}
                            disabled={offset === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateTableQuery({ offset: offset + limit })}
                            disabled={offset + data.length >= total}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

