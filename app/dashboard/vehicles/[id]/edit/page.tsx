import { Suspense } from "react";
import { notFound } from "next/navigation";
import { VehicleForm } from "../../../../../components/vehicle-form";
import { getBranches, getVehicles } from "@/lib/supabase";

interface EditVehiclePageProps {
  params: Promise<{
    id: string;
  }>;
}

interface EditVehicleContentProps {
  id: string;
}

async function EditVehicleContent({ id }: EditVehicleContentProps) {
  const [branches, vehicles] = await Promise.all([
    getBranches(),
    getVehicles(),
  ]);

  const vehicle = vehicles.find((v) => v.id === id);

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

export default async function EditVehiclePage({
  params,
}: EditVehiclePageProps) {
  // In Next.js 15, we must await the params object before accessing its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <EditVehicleContent id={id} />
    </Suspense>
  );
}
