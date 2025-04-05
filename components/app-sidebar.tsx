"use client";

import type * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CarIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

import { NavBranches } from "./nav-branches";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getBranches, type Branch } from "@/lib/supabase";
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
  ],
};

async function BranchesNav() {
  const branches = await getBranches();
  return <NavBranches items={branches} />;
}

// Replace with a client-side component
function BranchesNavClient() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      const branchesData = await getBranches();
      setBranches(branchesData);
      setLoading(false);
    };

    fetchBranches();
  }, []);

  if (loading) {
    return <div className="px-2 py-4">Loading branches...</div>;
  }

  return <NavBranches items={branches} />;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Fleet Manager</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <BranchesNavClient />
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
          pathname={pathname}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
