import { Suspense } from "react";
import BranchesSettings from "@/components/settings/branches-settings";
import { Skeleton } from "@/components/ui/skeleton";

// Loading Skeleton for the settings page content
const SettingsLoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-10 w-28" />
    </div>
    <Skeleton className="h-64 w-full rounded-md border" />
  </div>
);

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage application settings, such as branches.
            </p>
          </div>
          <div className="px-4 lg:px-6">
            <Suspense fallback={<SettingsLoadingSkeleton />}>
              <BranchesSettings />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
