"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BuildingIcon, CarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { type Branch } from "@/lib/supabase"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

interface NavBranchesProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Branch[]
}

export function NavBranches({ className, items, ...props }: NavBranchesProps) {
  const pathname = usePathname()

  return (
    <div className={cn("grid gap-1", className)} {...props}>
      <h3 className="px-2 text-lg font-semibold tracking-tight">
        Fleet Management
      </h3>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "flex h-9 w-full items-center justify-start px-2 hover:bg-muted",
          pathname === "/dashboard/vehicles" && "bg-muted font-medium"
        )}
      >
        <Link href="/dashboard/vehicles">
          <CarIcon className="mr-2 h-4 w-4" />
          <span>All Vehicles</span>
        </Link>
      </Button>
      <div className="px-2 py-1.5 text-sm font-semibold">Branches</div>
      <Accordion type="multiple" className="w-full">
        {items.map((branch) => (
          <AccordionItem key={branch.id} value={branch.id} className="border-0">
            <AccordionTrigger className="flex h-9 w-full items-center justify-between px-2 py-0 hover:bg-muted">
              <div className="flex items-center">
                <BuildingIcon className="mr-2 h-4 w-4" />
                <span>{branch.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-1">
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "flex h-9 w-full items-center justify-start pl-6 hover:bg-muted",
                  pathname === `/dashboard/branches/${branch.id}/vehicles` && "bg-muted font-medium"
                )}
              >
                <Link href={`/dashboard/branches/${branch.id}/vehicles`}>
                  <CarIcon className="mr-2 h-4 w-4" />
                  <span>Vehicles</span>
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
