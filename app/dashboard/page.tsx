import { ChartAreaInteractive } from "../../components/chart-area-interactive";
import { SectionCards } from "../../components/section-cards";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tight">
              Fleet Management Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome to your fleet management system. Use the sidebar to
              navigate.
            </p>
          </div>
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
