import { BookOpen, Gauge, Text, type LucideIcon } from "lucide-react";

export type NavItem = {
  label: string
  url?: string
  icon: LucideIcon
  children?: {
    label: string
    url: string
  }[]
}

export const navitems: NavItem[] = [
  {
    label: "Dashboard",
    url: "/admin",
    icon: Gauge,
  },
  {
    label: "Articles",
    icon: Text,
    children: [
      {
        label: 'Published',
        url: '/admin/articles'
      },
      {
        label: 'Draft',
        url: '/admin/articles/draft'
      },
      {
        label: 'Archived',
        url: '/admin/articles/archived'
      },
    ]
  },
  {
    label: "Catalogs",
    icon: BookOpen,
    children: [
      {
        label: 'Available',
        url: '/admin/catalogs'
      },
      {
        label: 'Archived',
        url: '/admin/catalogs/archived'
      },
    ]
  },
]