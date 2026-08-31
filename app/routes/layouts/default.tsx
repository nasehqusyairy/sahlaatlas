import { Outlet } from "react-router";
import { Navbar } from "~/components/navbar";
import { PageFooter } from "~/components/page-footer";

export default function DefaultLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <PageFooter />
        </>
    )
}