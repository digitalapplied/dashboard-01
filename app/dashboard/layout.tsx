import React, { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { BranchesNavLoader } from "@/components/nav-branches-loader";
import { BranchesNavSkeleton } from "@/components/nav-branches-skeleton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const branchesNav = (
    <Suspense fallback={<BranchesNavSkeleton />}>
      <BranchesNavLoader />
    </Suspense>
  );

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" branchesNav={branchesNav} />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
