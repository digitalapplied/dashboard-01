"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BuildingIcon, CarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { type Branch } from "@/lib/supabase"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface NavBranchesProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Branch[]
}

export function NavBranches({ className, items, ...props }: NavBranchesProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup className={className} {...props}>
      <SidebarGroupLabel>Fleet Management</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="All Vehicles">
              <Link href="/dashboard/vehicles">
                <CarIcon />
                <span>All Vehicles</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroupLabel className="pt-2">Branches</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((branch) => (
            <SidebarMenuItem key={branch.id}>
              <SidebarMenuButton 
                asChild 
                tooltip={branch.name}
                data-active={pathname === `/dashboard/branches/${branch.id}/vehicles`}
              >
                <Link href={`/dashboard/branches/${branch.id}/vehicles`}>
                  <BuildingIcon />
                  <span>{branch.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
