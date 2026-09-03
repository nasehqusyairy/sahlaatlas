import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "~/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible"
import { ChevronRightIcon } from "lucide-react";
import { navitems } from "~/models/nav-item";

export function NavItems() {
    const { pathname } = useLocation()

    return (
        <>
            {navitems.map((item) => (
                item.children?.length ? (
                    <CollapsibleNavItem key={item.label} item={item} pathname={pathname} />
                ) : (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton render={<NavLink to={item.url || '/admin'} end />}>
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            ))}
        </>
    )
}

function CollapsibleNavItem({
    item,
    pathname,
}: {
    item: (typeof navitems)[number]
    pathname: string
}) {
    const hasActiveChild = item.children?.some((child) => pathname === child.url || pathname.startsWith(`${child.url}/`)) ?? false
    const [isOpen, setIsOpen] = useState(hasActiveChild)

    useEffect(() => {
        if (hasActiveChild) {
            setIsOpen(true)
        }
    }, [hasActiveChild])

    return (
        <Collapsible
            open={hasActiveChild || isOpen}
            onOpenChange={setIsOpen}
            className="group/collapsible"
            render={<SidebarMenuItem />}
        >
            <CollapsibleTrigger render={<SidebarMenuButton tooltip={item.label} />}>
                <item.icon />
                <span>{item.label}</span>
                <ChevronRightIcon className="ms-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub>
                    {item.children?.map((child) => (
                        <SidebarMenuSubItem key={child.label}>
                            <SidebarMenuSubButton
                                isActive={pathname === child.url || pathname.startsWith(`${child.url}/`)}
                                render={<NavLink to={child.url} end />}
                            >
                                <span>{child.label}</span>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    )
}
