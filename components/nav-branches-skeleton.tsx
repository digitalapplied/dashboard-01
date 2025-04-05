import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";

export function BranchesNavSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Fleet Management</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Skeleton for All Vehicles */}
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroupLabel className="pt-2">Branches</SidebarGroupLabel>
        <SidebarMenu>
          {/* Render a few skeleton items for branches */}
          {Array.from({ length: 3 }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuSkeleton showIcon />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
