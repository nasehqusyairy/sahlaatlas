import { Gauge, Text, type LucideIcon } from "lucide-react";

export type NavItem = {
  label: string
  url: string
  icon: LucideIcon
}

export const navitems: NavItem[] = [
  {
    label: "Dashboard",
    url: "/admin",
    icon: Gauge,
  },
  {
    label: "Articles",
    url: "/admin/articles",
    icon: Text,
  },
]