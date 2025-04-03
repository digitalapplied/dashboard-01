import { Suspense } from "react";
import { notFound } from "next/navigation";
import { VehiclesTable } from "../../../../../components/vehicles-table";
import { getBranches, getVehiclesByBranch } from "@/lib/supabase";

// In Next.js 15, we must use a special type for params
interface BranchVehiclesPageProps {
  params: Promise<{
    branchId: string;
  }>;
}

interface BranchVehiclesContentProps {
  branchId: string;
}

async function BranchVehiclesContent({ branchId }: BranchVehiclesContentProps) {
  const [branches, vehicles] = await Promise.all([
    getBranches(),
    getVehiclesByBranch(branchId),
  ]);

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
              {branch.name} - Vehicles
            </h1>
            <p className="text-muted-foreground">
              Manage and view vehicles for this branch.
            </p>
          </div>
          <div className="px-4 lg:px-6">
            <VehiclesTable data={vehicles} branchId={branchId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function BranchVehiclesPage({
  params,
}: BranchVehiclesPageProps) {
  // In Next.js 15, we must await the params object before accessing its properties
  const resolvedParams = await params;
  const branchId = resolvedParams.branchId;

  return (
    <Suspense fallback={<div className="p-4">Loading branch vehicles...</div>}>
      <BranchVehiclesContent branchId={branchId} />
    </Suspense>
  );
}
