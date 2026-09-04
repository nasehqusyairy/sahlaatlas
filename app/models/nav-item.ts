import { Gauge, LetterText, ShoppingBasket, type LucideIcon } from "lucide-react";

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
    icon: LetterText,
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
    label: "Products",
    icon: ShoppingBasket,
    children: [
      {
        label: 'Available',
        url: '/admin/products'
      },
      {
        label: 'Archived',
        url: '/admin/products/archived'
      },
    ]
  },
]