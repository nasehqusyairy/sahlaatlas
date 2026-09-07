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
import { ChevronRightIcon, HelpCircle } from "lucide-react";
import { SIDEBAR_ITEMS, type NavItem } from "~/models/nav-item";

export function NavItems() {
    const { pathname } = useLocation()

    return (
        <>
            {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon || HelpCircle
                return (item.children?.length ? (
                    <CollapsibleNavItem key={item.label} item={item} pathname={pathname} />
                ) : (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton render={<NavLink to={item.url || '/admin'} end />}>
                            <Icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))
            })}
        </>
    )
}

function CollapsibleNavItem(props: {
    item: NavItem
    pathname: string
}) {
    const hasActiveChild = props.item.children?.some((child) => props.pathname === child.url || props.pathname.startsWith(`${child.url}/`)) ?? false
    const [isOpen, setIsOpen] = useState(hasActiveChild)

    useEffect(() => {
        if (hasActiveChild) {
            setIsOpen(true)
        }
    }, [hasActiveChild])

    const Icon = props.item.icon || HelpCircle

    return (
        <Collapsible
            open={hasActiveChild || isOpen}
            onOpenChange={setIsOpen}
            className="group/collapsible"
            render={<SidebarMenuItem />}
        >
            <CollapsibleTrigger render={<SidebarMenuButton tooltip={props.item.label} />}>
                <Icon />
                <span>{props.item.label}</span>
                <ChevronRightIcon className="ms-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub>
                    {props.item.children?.map((child) => (
                        <SidebarMenuSubItem key={child.label}>
                            <SidebarMenuSubButton
                                isActive={props.pathname === child.url || props.pathname.startsWith(`${child.url}/`)}
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
