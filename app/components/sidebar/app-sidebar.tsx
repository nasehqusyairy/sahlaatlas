import { NavUser } from "~/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "~/components/ui/sidebar"
import { NavItems } from "./nav-items";
import { MenuGroup } from "./menu-group";
import { LogoutButton } from "./actions/logout-button";
import { Globe } from "lucide-react";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div
          className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground flex items-center gap-2"
        >
          <img src="/images/logo.png" alt="Logo" className="size-8 bg-muted p-2" />
          <div className="grid flex-1 text-start text-sm leading-tight">
            <span className="truncate font-medium">Sahla Atlas</span>
            <span className="truncate text-xs">Export Departement</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <MenuGroup label="Navigation">
          <NavItems />
        </MenuGroup>
        <MenuGroup label="actions">

          <SidebarMenuButton render={<Link to={'/'} target="_blank" />}>
            <Globe />
            Landing Page
          </SidebarMenuButton>

          <LogoutButton />

        </MenuGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
