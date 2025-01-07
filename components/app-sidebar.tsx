"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { userData, teamItems, navMainItems } from "./sidebar-data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"
  return (
    <Sidebar collapsible="icon" {...props} className={isDarkTheme ? "dark" : ""}>
      <SidebarHeader>
        <TeamSwitcher teams={teamItems} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


