import { Suspense } from "react";
import { AppSidebar } from "../../../../components/app-sidebar";
import { SiteHeader } from "../../../../components/site-header";
import { VehicleForm } from "../../../../components/vehicle-form";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getBranches } from "@/lib/supabase";

async function NewVehicleContent() {
  const branches = await getBranches();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tight">
              Add New Vehicle
            </h1>
            <p className="text-muted-foreground">
              Create a new vehicle in your fleet.
            </p>
          </div>
          <div className="px-4 lg:px-6">
            <VehicleForm branches={branches} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewVehiclePage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <NewVehicleContent />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
