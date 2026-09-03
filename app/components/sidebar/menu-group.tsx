import type { ReactNode } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "~/components/ui/sidebar"

export function MenuGroup(props: {
  label: string
  children: ReactNode
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
      <SidebarMenu>
        {props.children}
      </SidebarMenu>
    </SidebarGroup>
  )
}
