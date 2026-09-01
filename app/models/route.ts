import type { LoaderFunction } from "react-router";

export type ComponentProps<Loader extends LoaderFunction> = {
    loaderData:Awaited<ReturnType<Loader>>
}