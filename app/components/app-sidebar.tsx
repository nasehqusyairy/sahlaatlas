import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"
import { FrameIcon, PieChartIcon, MapIcon } from "lucide-react"
import { Nav } from "./nav";

const navitems = [
  {
    name: "Design Engineering",
    url: "#",
    icon: (
      <FrameIcon
      />
    ),
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: (
      <PieChartIcon
      />
    ),
  },
  {
    name: "Travel",
    url: "#",
    icon: (
      <MapIcon
      />
    ),
  },
]

const user = {
  email: 'admin@example.com',
  name: "Admin",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
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
        <Nav items={navitems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
