import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppSidebar } from "../../../../../components/app-sidebar";
import { SiteHeader } from "../../../../../components/site-header";
import { VehicleForm } from "../../../../../components/vehicle-form";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getBranches, getVehicles } from "@/lib/supabase";

interface EditVehiclePageProps {
  params: {
    vehicleId: string;
  };
}

async function EditVehicleContent({ vehicleId }: { vehicleId: string }) {
  const [branches, vehicles] = await Promise.all([
    getBranches(),
    getVehicles(),
  ]);

  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tight">Edit Vehicle</h1>
            <p className="text-muted-foreground">
              Modify details for fleet #{vehicle.fleet_number}
            </p>
          </div>
          <div className="px-4 lg:px-6">
            <VehicleForm vehicle={vehicle} branches={branches} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditVehiclePage({ params }: EditVehiclePageProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <EditVehicleContent vehicleId={params.vehicleId} />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
