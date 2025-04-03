import { Suspense } from "react"
import { AppSidebar } from "../../../components/app-sidebar"
import { SiteHeader } from "../../../components/site-header"
import { VehiclesTable } from "../../../components/vehicles-table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getVehicles } from "@/lib/supabase"

async function VehiclesContent() {
  const vehicles = await getVehicles()
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tight">All Vehicles</h1>
            <p className="text-muted-foreground">Manage and view all vehicles in your fleet.</p>
          </div>
          <div className="px-4 lg:px-6">
            <VehiclesTable data={vehicles} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VehiclesPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Suspense fallback={<div className="p-4">Loading vehicles...</div>}>
          <VehiclesContent />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  )
}
