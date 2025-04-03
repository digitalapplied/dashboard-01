import { Suspense } from "react"
import { notFound } from "next/navigation"
import { AppSidebar } from "../../../../../components/app-sidebar"
import { SiteHeader } from "../../../../../components/site-header"
import { VehiclesTable } from "../../../../../components/vehicles-table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getBranches, getVehiclesByBranch } from "@/lib/supabase"

interface BranchVehiclesPageProps {
  params: {
    branchId: string
  }
}

async function BranchVehiclesContent({ branchId }: { branchId: string }) {
  const [branches, vehicles] = await Promise.all([
    getBranches(),
    getVehiclesByBranch(branchId)
  ])
  
  const branch = branches.find(b => b.id === branchId)
  
  if (!branch) {
    notFound()
  }
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tight">{branch.name} - Vehicles</h1>
            <p className="text-muted-foreground">Manage and view vehicles for this branch.</p>
          </div>
          <div className="px-4 lg:px-6">
            <VehiclesTable data={vehicles} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BranchVehiclesPage({ params }: BranchVehiclesPageProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Suspense fallback={<div className="p-4">Loading branch vehicles...</div>}>
          <BranchVehiclesContent branchId={params.branchId} />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  )
}
