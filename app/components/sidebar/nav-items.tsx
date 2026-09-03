import { NavLink } from "react-router";
import {
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar"
import { navitems } from "~/models/nav-item";

export function NavItems() {
    return (
        <>
            {navitems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton render={<NavLink to={item.url} end />}>
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    )
}
