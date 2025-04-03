import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppSidebar } from "../../../../../../components/app-sidebar";
import { SiteHeader } from "../../../../../../components/site-header";
import { VehicleForm } from "../../../../../../components/vehicle-form";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getBranches } from "@/lib/supabase";

interface NewBranchVehiclePageProps {
  params: {
    branchId: string;
  };
}

async function NewBranchVehicleContent({ branchId }: { branchId: string }) {
  const branches = await getBranches();
  const branch = branches.find((b) => b.id === branchId);

  if (!branch) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tight">
              Add Vehicle to {branch.name}
            </h1>
            <p className="text-muted-foreground">
              Create a new vehicle for this branch.
            </p>
          </div>
          <div className="px-4 lg:px-6">
            <VehicleForm branches={branches} branchId={branchId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewBranchVehiclePage({
  params,
}: NewBranchVehiclePageProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <NewBranchVehicleContent branchId={params.branchId} />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
