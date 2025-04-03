"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createVehicle,
  updateVehicle,
  type Vehicle,
  type NewVehicle,
} from "@/lib/supabase";

const vehicleFormSchema = z.object({
  branch_id: z.string().uuid({ message: "Branch ID is required" }),
  fleet_number: z.string().min(1, { message: "Fleet number is required" }),
  registration_number: z.string().optional().nullable(),
  make: z.string().optional().nullable(),
  engine_model: z.string().optional().nullable(),
  vin: z.string().optional().nullable(),
  manufacture_year: z.coerce.number().optional().nullable(),
  year_details: z.string().optional().nullable(),
  vehicle_type: z.string().optional().nullable(),
  tare_weight_kg: z.coerce.number().optional().nullable(),
  permission_weight: z.coerce.number().optional().nullable(),
  permission_unit: z.string().optional().nullable(),
  volume_litres: z.coerce.number().optional().nullable(),
  pallet_capacity: z.coerce.number().optional().nullable(),
  tyre_specification: z.string().optional().nullable(),
  wheel_count: z.coerce.number().optional().nullable(),
  value_zar: z.coerce.number().optional().nullable(),
  notes: z.string().optional().nullable(),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export function VehicleForm({
  vehicle,
  branchId,
  branches,
}: {
  vehicle?: Vehicle;
  branchId?: string;
  branches: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: vehicle || {
      branch_id: branchId || "",
      fleet_number: "",
      registration_number: "",
      make: "",
      engine_model: "",
      vin: "",
      manufacture_year: null,
      year_details: "",
      vehicle_type: "",
      tare_weight_kg: null,
      permission_weight: null,
      permission_unit: "",
      volume_litres: null,
      pallet_capacity: null,
      tyre_specification: "",
      wheel_count: null,
      value_zar: null,
      notes: "",
    },
  });

  async function onSubmit(data: VehicleFormValues) {
    setIsSubmitting(true);
    try {
      if (vehicle) {
        // Update existing vehicle
        await updateVehicle({
          id: vehicle.id,
          ...data,
        });
        toast.success("Vehicle updated successfully");
      } else {
        // Create new vehicle
        await createVehicle(data as NewVehicle);
        toast.success("Vehicle created successfully");
      }

      // Redirect based on context
      if (branchId) {
        router.push(`/dashboard/branches/${branchId}/vehicles`);
      } else {
        router.push("/dashboard/vehicles");
      }
      router.refresh();
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast.error("Failed to save vehicle");
    } finally {
      setIsSubmitting(false);
    }
  }

  const vehicleTypes = [
    "Truck",
    "Van",
    "Pickup",
    "Sedan",
    "SUV",
    "Bus",
    "Trailer",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Branch Selection */}
        <FormField
          control={form.control}
          name="branch_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <Select
                disabled={!!branchId || isSubmitting}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Basic Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fleet_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fleet Number *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter fleet number"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registration_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter registration number"
                    {...field}
                    value={field.value || ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter make"
                    {...field}
                    value={field.value || ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engine_model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engine Model</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter engine model"
                    {...field}
                    value={field.value || ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VIN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter VIN"
                    {...field}
                    value={field.value || ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicle_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manufacture_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacture Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter year"
                    {...field}
                    value={field.value === null ? "" : field.value}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? null : parseInt(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Details</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter year details"
                    {...field}
                    value={field.value || ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Technical Specifications */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tare_weight_kg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tare Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter tare weight"
                    {...field}
                    value={field.value === null ? "" : field.value}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? null
                          : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permission_weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permission Weight</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter permission weight"
                    {...field}
                    value={field.value === null ? "" : field.value}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? null
                          : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permission_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permission Unit</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter permission unit"
                    {...field}
                    value={field.value || ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volume_litres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume (litres)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter volume"
                    {...field}
                    value={field.value === null ? "" : field.value}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? null
                          : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pallet_capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pallet Capacity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter pallet capacity"
                    {...field}
                    value={field.value === null ? "" : field.value}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? null : parseInt(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tyre_specification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tyre Specification</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tyre specification"
                    {...field}
                    value={field.value || ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wheel_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wheel Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter wheel count"
                    {...field}
                    value={field.value === null ? "" : field.value}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? null : parseInt(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value_zar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value (ZAR)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter value"
                    {...field}
                    value={field.value === null ? "" : field.value}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? null
                          : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter notes about the vehicle"
                  className="min-h-32"
                  {...field}
                  value={field.value || ""}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : vehicle
              ? "Update Vehicle"
              : "Create Vehicle"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
