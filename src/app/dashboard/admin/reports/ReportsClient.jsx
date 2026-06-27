"use client";

import { useState } from "react";
import ReportsTable from "./ReportsTable";
import { dismissReport } from "@/lib/action/report";
import { toast } from "react-toastify";
import { deleteRecipe } from "@/lib/action/recipe";

export default function ReportsClient({ initialReports }) {
  const [reports, setReports] = useState(initialReports ?? []);

  const updateStatus = (reportId, status) => {
    setReports((prev) =>
      prev.map((r) => ((r._id ?? r.id) === reportId ? { ...r, status } : r))
    );
  };

  const handleDismiss = async (reportId) => {
    updateStatus(reportId, "dismissed");
    try {
      const res = await dismissReport(reportId);
      if (res?.deletedCount) {
        updateStatus(reportId, "resolved");
        toast.success("Report dismissed");
      }
    } catch (err) {
      updateStatus(reportId, "pending");
      console.error("Failed to dismiss report:", err);
    }
  };

  const handleRemoveRecipe = async (reportId, recipeId) => {
    updateStatus(reportId, "resolved");
    try {
      const res = await dismissReport(reportId);
      await deleteRecipe(recipeId);
    } catch (err) {
      updateStatus(reportId, "pending");
      console.error("Failed to remove recipe:", err);
    }
  };

  return (
    <ReportsTable
      reports={reports}
      onDismiss={handleDismiss}
      onRemoveRecipe={handleRemoveRecipe}
    />
  );
}