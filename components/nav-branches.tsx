"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BuildingIcon, CarIcon } from "lucide-react";

import type { Branch } from "@/lib/supabase";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavBranchesProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Branch[];
}

export function NavBranches({ className, items, ...props }: NavBranchesProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup className={className} {...props}>
      <SidebarGroupLabel>Fleet Management</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="All Vehicles"
              isActive={pathname === "/dashboard/vehicles"}
            >
              <Link href="/dashboard/vehicles" prefetch={false}>
                <CarIcon />
                <span>All Vehicles</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroupLabel className="pt-2">Branches</SidebarGroupLabel>
        <SidebarMenu>
          {items.length === 0 && (
            <SidebarMenuItem>
              <SidebarMenuButton disabled size="sm">
                <span className="text-muted-foreground">No branches found</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {items.map((branch) => {
            const branchUrl = `/dashboard/branches/${branch.id}/vehicles`;
            return (
              <SidebarMenuItem key={branch.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={branch.name}
                  isActive={pathname === branchUrl}
                >
                  <Link href={branchUrl} prefetch={false}>
                    <BuildingIcon />
                    <span>{branch.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
