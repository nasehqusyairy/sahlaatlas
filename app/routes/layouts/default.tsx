import { Outlet, type MetaFunction } from "react-router";
import { Navbar } from "~/components/navbar";
import { PageFooter } from "~/components/page-footer";

export const meta: MetaFunction = () => {
    return [
        {
            title: 'Sahla Atlas Export'
        }
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