import { getBranches } from "@/lib/supabase";
import { NavBranches } from "./nav-branches"; // Import the presentation component

// This is an async Server Component
export async function BranchesNavLoader() {
  const branches = await getBranches();
  // Pass the fetched data to the client or server component that renders the UI
  return <NavBranches items={branches} />;
}
