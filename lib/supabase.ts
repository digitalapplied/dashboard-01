import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Vehicle = {
  id: string;
  branch_id: string;
  fleet_number: string;
  registration_number: string | null;
  make: string | null;
  engine_model: string | null;
  vin: string | null;
  manufacture_year: number | null;
  year_details: string | null;
  vehicle_type: string | null;
  tare_weight_kg: number | null;
  permission_weight: number | null;
  permission_unit: string | null;
  volume_litres: number | null;
  pallet_capacity: number | null;
  tyre_specification: string | null;
  wheel_count: number | null;
  value_zar: number | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Branch = {
  id: string;
  name: string;
  created_at: string | null;
};

export async function getVehicles() {
  const { data, error } = await supabase.from("vehicles").select("*");

  if (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }

  return data as Vehicle[];
}

export async function getVehiclesByBranch(branchId: string) {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("branch_id", branchId);

  if (error) {
    console.error("Error fetching vehicles by branch:", error);
    return [];
  }

  return data as Vehicle[];
}

export async function getBranches() {
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching branches:", error);
    return [];
  }

  return data as Branch[];
}

export type NewVehicle = Omit<Vehicle, "id" | "created_at" | "updated_at">;
export type UpdateVehicle = Partial<NewVehicle> & { id: string };

export async function createVehicle(vehicle: NewVehicle) {
  const { data, error } = await supabase
    .from("vehicles")
    .insert([vehicle])
    .select()
    .single();

  if (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }

  return data as Vehicle;
}

export async function updateVehicle(vehicle: UpdateVehicle) {
  const { id, ...updatedFields } = vehicle;

  const { data, error } = await supabase
    .from("vehicles")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }

  return data as Vehicle;
}

export async function deleteVehicle(id: string) {
  const { error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }

  return true;
}

export type NewBranch = {
  name: string;
};

export type UpdateBranch = {
  id: string;
  name: string;
};

export async function createBranch(branch: NewBranch): Promise<Branch> {
  if (!branch.name || branch.name.trim() === "") {
    throw new Error("Branch name cannot be empty.");
  }

  const { data, error } = await supabase
    .from("branches")
    .insert({ name: branch.name.trim() })
    .select()
    .single();

  if (error) {
    console.error("Error creating branch:", error);
    if (error.code === "23505") {
      throw new Error("A branch with this name already exists.");
    }
    throw error;
  }

  return data as Branch;
}

export async function updateBranch(branch: UpdateBranch): Promise<Branch> {
  if (!branch.name || branch.name.trim() === "") {
    throw new Error("Branch name cannot be empty.");
  }

  const { data, error } = await supabase
    .from("branches")
    .update({ name: branch.name.trim() })
    .eq("id", branch.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating branch:", error);
    if (error.code === "23505") {
      throw new Error("A branch with this name already exists.");
    }
    throw error;
  }

  return data as Branch;
}

export async function deleteBranch(id: string): Promise<boolean> {
  const { data: vehicles, error: checkError } = await supabase
    .from("vehicles")
    .select("id")
    .eq("branch_id", id)
    .limit(1);

  if (checkError) {
    console.error("Error checking for associated vehicles:", checkError);
    throw new Error("Could not verify if branch can be deleted.");
  }

  if (vehicles && vehicles.length > 0) {
    throw new Error(
      "Cannot delete branch: Vehicles are still associated with it."
    );
  }

  const { error } = await supabase.from("branches").delete().eq("id", id);

  if (error) {
    console.error("Error deleting branch:", error);
    throw error;
  }

  return true;
}
