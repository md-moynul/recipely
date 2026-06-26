"use client";

import { useState } from "react";
import ReportsTable from "./ReportsTable";

// TODO: import your real API helpers, e.g.
// import { dismissReport, removeReportedRecipe } from "@/lib/api/report";

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
      // TODO: replace with your real call, e.g.
      // await dismissReport(reportId);
      console.log("Dismissing report:", reportId);
    } catch (err) {
      updateStatus(reportId, "pending");
      console.error("Failed to dismiss report:", err);
    }
  };

  const handleRemoveRecipe = async (reportId, recipeId) => {
    updateStatus(reportId, "resolved");
    try {
      // TODO: replace with your real call, e.g.
      await removeReportedRecipe(reportId, recipeId);
      console.log("Removing recipe for report:", reportId, recipeId);
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