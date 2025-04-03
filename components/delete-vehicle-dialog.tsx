"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteVehicle } from "@/lib/supabase";
import { toast } from "sonner";

interface DeleteVehicleDialogProps {
  vehicle: {
    id: string;
    fleet_number: string;
  };
  variant?: "ghost" | "outline" | "default";
  size?: "default" | "sm" | "lg" | "icon";
  onDeleted?: () => void;
}

export function DeleteVehicleDialog({
  vehicle,
  variant = "ghost",
  size = "icon",
  onDeleted,
}: DeleteVehicleDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!vehicle) return;

    setIsDeleting(true);
    try {
      await deleteVehicle(vehicle.id);
      toast.success("Vehicle deleted successfully");
      setOpen(false);
      if (onDeleted) {
        onDeleted();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Failed to delete vehicle");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={
            variant === "default"
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : ""
          }
        >
          {size === "icon" ? (
            <TrashIcon className="h-4 w-4" />
          ) : (
            <>
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this vehicle?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete fleet #{vehicle.fleet_number}. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete Vehicle"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
