import { Outlet, type MetaFunction } from "react-router";
import { Navbar } from "~/components/navbar";
import { PageFooter } from "~/components/page-footer";

export const meta: MetaFunction = () => {
    return [
        { title: "Sahla Atlas | Indonesian Agricultural Commodity Exporter" },

    ]
}

export default function DefaultLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <PageFooter />
        </>
    )
}