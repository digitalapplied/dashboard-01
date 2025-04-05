"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch,
  type Branch,
  type NewBranch,
  type UpdateBranch,
} from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Plus, Edit, Trash2, Building } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function BranchesSettings() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const loadBranchesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBranches();
      setBranches(data);
    } catch (error) {
      console.error("Failed to load branches:", error);
      setError("Failed to load branches.");
      toast.error("Failed to load branches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranchesData();
  }, []);

  // Focus input when dialogs open
  useEffect(() => {
    if (addDialogOpen) {
      setTimeout(() => addInputRef.current?.focus(), 100);
    }
  }, [addDialogOpen]);

  useEffect(() => {
    if (editDialogOpen) {
      setTimeout(() => editInputRef.current?.focus(), 100);
    }
  }, [editDialogOpen]);

  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchName.trim()) {
      setError("Branch name is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await createBranch({ name: branchName.trim() });
      toast.success(`Branch "${branchName.trim()}" added successfully.`);
      setAddDialogOpen(false);
      setBranchName("");
      await loadBranchesData(); // Refresh list
    } catch (err: any) {
      console.error("Error adding branch:", err);
      const message = err.message || "Failed to add branch.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchName.trim() || !selectedBranch) {
      setError("Branch name is required.");
      return;
    }
    if (branchName.trim() === selectedBranch.name) {
      setEditDialogOpen(false); // Close dialog if name hasn't changed
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await updateBranch({ id: selectedBranch.id, name: branchName.trim() });
      toast.success(`Branch updated successfully.`);
      setEditDialogOpen(false);
      setBranchName("");
      setSelectedBranch(null);
      await loadBranchesData(); // Refresh list
    } catch (err: any) {
      console.error("Error updating branch:", err);
      const message = err.message || "Failed to update branch.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBranch = async () => {
    if (!selectedBranch) return;

    setIsSubmitting(true);
    try {
      await deleteBranch(selectedBranch.id);
      toast.success(`Branch "${selectedBranch.name}" deleted successfully.`);
      setDeleteDialogOpen(false);
      setSelectedBranch(null);
      await loadBranchesData(); // Refresh list
    } catch (err: any) {
      console.error("Error deleting branch:", err);
      toast.error(err.message || "Failed to delete branch.");
    } finally {
      setIsSubmitting(false);
      setDeleteDialogOpen(false); // Ensure dialog closes even on error
    }
  };

  const openEditDialog = (branch: Branch) => {
    setSelectedBranch(branch);
    setBranchName(branch.name);
    setError(null);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (branch: Branch) => {
    setSelectedBranch(branch);
    setDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Branches</h3>
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-32" />
                </TableHead>
                <TableHead className="w-[100px] text-right">
                  <Skeleton className="h-4 w-16" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-36" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error && branches.length === 0) {
    return <p className="text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Branches</h3>

        {/* Add Branch Dialog Trigger & Content */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddBranch}>
              <DialogHeader>
                <DialogTitle>Add New Branch</DialogTitle>
                <DialogDescription>
                  Enter the name for the new branch.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="add-branch-name">Branch Name</Label>
                  <Input
                    id="add-branch-name"
                    ref={addInputRef}
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="e.g., Cape Town Central"
                    className={error ? "border-destructive" : ""}
                    autoComplete="off"
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setBranchName("");
                      setError(null);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Branch"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Branches Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Branch Name</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No branches found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {branch.name}
                  </TableCell>
                  <TableCell>
                    {branch.created_at
                      ? new Date(branch.created_at).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {/* Edit Branch Dialog Trigger */}
                      <Dialog
                        open={
                          editDialogOpen && selectedBranch?.id === branch.id
                        }
                        onOpenChange={(open) => {
                          if (!open) {
                            setEditDialogOpen(false);
                            setSelectedBranch(null);
                            setBranchName("");
                            setError(null);
                          } else {
                            openEditDialog(branch);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditDialog(branch)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit Branch</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <form onSubmit={handleEditBranch}>
                            <DialogHeader>
                              <DialogTitle>Edit Branch</DialogTitle>
                              <DialogDescription>
                                Update the name for the "{selectedBranch?.name}"
                                branch.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-branch-name">
                                  Branch Name
                                </Label>
                                <Input
                                  id="edit-branch-name"
                                  ref={editInputRef}
                                  value={branchName}
                                  onChange={(e) =>
                                    setBranchName(e.target.value)
                                  }
                                  placeholder="Enter branch name"
                                  className={error ? "border-destructive" : ""}
                                  autoComplete="off"
                                />
                                {error && (
                                  <p className="text-sm text-destructive">
                                    {error}
                                  </p>
                                )}
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setError(null)}
                                >
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Changes"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>

                      {/* Delete Branch Confirmation Dialog Trigger */}
                      <AlertDialog
                        open={
                          deleteDialogOpen && selectedBranch?.id === branch.id
                        }
                        onOpenChange={(open) => {
                          if (!open) {
                            setDeleteDialogOpen(false);
                            setSelectedBranch(null);
                          } else {
                            openDeleteDialog(branch);
                          }
                        }}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => openDeleteDialog(branch)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Branch</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the branch "
                              {selectedBranch?.name}". Make sure no vehicles are
                              assigned to this branch.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isSubmitting}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteBranch}
                              disabled={isSubmitting}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {isSubmitting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
