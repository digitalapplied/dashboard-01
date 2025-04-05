"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  const pathname = usePathname();

  let title = "Dashboard";
  if (pathname?.startsWith("/dashboard/vehicles/new")) {
    title = "Add Vehicle";
  } else if (pathname?.match(/^\/dashboard\/vehicles\/[^/]+\/edit$/)) {
    title = "Edit Vehicle";
  } else if (pathname?.startsWith("/dashboard/branches")) {
    title = "Branch Vehicles";
  } else if (pathname === "/dashboard/vehicles") {
    title = "All Vehicles";
  } else if (pathname === "/dashboard/settings") {
    title = "Settings";
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
}
