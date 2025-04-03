import { Suspense } from "react";
import { notFound } from "next/navigation";
import { VehicleForm } from "../../../../../../components/vehicle-form";
import { getBranches } from "@/lib/supabase";

interface NewBranchVehiclePageProps {
  params: Promise<{
    branchId: string;
  }>;
}

interface NewBranchVehicleContentProps {
  branchId: string;
}

async function NewBranchVehicleContent({
  branchId,
}: NewBranchVehicleContentProps) {
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

export default async function NewBranchVehiclePage({
  params,
}: NewBranchVehiclePageProps) {
  // In Next.js 15, we must await the params object before accessing its properties
  const resolvedParams = await params;
  const branchId = resolvedParams.branchId;

  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <NewBranchVehicleContent branchId={branchId} />
    </Suspense>
  );
}
