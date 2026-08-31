import {
    Breadcrumb as BaseBreadCrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

export function Breadcrumb() {
    return (
        <BaseBreadCrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        Admin
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </BaseBreadCrumb>
    )
}