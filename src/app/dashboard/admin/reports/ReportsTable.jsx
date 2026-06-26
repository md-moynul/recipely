"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flag } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { getRecipeByRecipeId } from "@/lib/api/recipe";

function RecipeCell({ recipeId }) {
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | found | missing | error

  useEffect(() => {
    if (!recipeId) {
      return 
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await getRecipeByRecipeId(recipeId);
        if (cancelled) return;
        if (!data) {
          setStatus("missing");
        } else {
          setRecipe(data);
          setStatus("found");
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load recipe for report:", recipeId, err);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [recipeId]);

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-[#F2EDE4] dark:bg-[#2A251E]" />
        <div className="h-3 w-28 animate-pulse rounded bg-[#F2EDE4] dark:bg-[#2A251E]" />
      </div>
    );
  }

  if (status === "missing" || status === "error") {
    return (
      <span className="text-sm text-[#9C9388] italic">
        {status === "missing" ? "Recipe deleted" : "Couldn't load recipe"}
      </span>
    );
  }

  return (
    <Link
      href={`/recipes/${recipeId}`}
      className="flex items-center gap-3 text-sm font-medium text-[#2B2420] hover:text-[#E85D3D] dark:text-[#F4EDE4]"
    >
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#FBF1E6] ring-1 ring-[#EAE0D3] dark:bg-[#1A1714] dark:ring-[#3A332A]">
        {recipe.recipeImage ? (
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      <span className="truncate">{recipe.recipeName}</span>
    </Link>
  );
}

function ReasonBadge({ reason }) {
  const styles = {
    spam: "bg-[#FFF4E0] text-[#B5870A] dark:bg-[#3A2E14] dark:text-[#E8C468]",
    offensive: "bg-[#FBE9E7] text-[#C0392B] dark:bg-[#3A1F1B] dark:text-[#E8897A]",
    copyright: "bg-[#EDE7F6] text-[#5E35B1] dark:bg-[#2A1F3A] dark:text-[#B39DDB]",
  };

  const fallback = "bg-[#F2EDE4] text-[#6B6155] dark:bg-[#2A251E] dark:text-[#9C9388]";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        styles[reason] ?? fallback
      }`}
    >
      {reason ?? "unknown"}
    </span>
  );
}

function ReportStatusBadge({ status }) {
  const styles = {
    pending: "bg-[#FFF4E0] text-[#B5870A] dark:bg-[#3A2E14] dark:text-[#E8C468]",
    resolved: "bg-[#E6F4EA] text-[#1E7B3C] dark:bg-[#1E3B2A] dark:text-[#6FCF8E]",
    dismissed: "bg-[#F2EDE4] text-[#6B6155] dark:bg-[#2A251E] dark:text-[#9C9388]",
  };

  const fallback = "bg-[#F2EDE4] text-[#6B6155] dark:bg-[#2A251E] dark:text-[#9C9388]";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        styles[status] ?? fallback
      }`}
    >
      {status ?? "pending"}
    </span>
  );
}

export default function ReportsTable({ reports,onRemoveRecipe,onDismiss }) {
    
  if (!reports || reports.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-[#EAE0D3] p-12 text-center dark:border-[#3A332A]">
        <Flag width={24} height={24} className="mx-auto text-[#C9BFAF]" />
        <p className="mt-3 text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
          No reports yet
        </p>
        <p className="mt-1 text-sm text-[#9C9388]">
          Reported recipes will show up here for review.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-[#EAE0D3] shadow-sm dark:border-[#3A332A]">
      <table className="w-full bg-white dark:bg-[#252019]">
        <thead className="border-b border-[#EAE0D3] dark:border-[#3A332A]">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
              Recipe
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
              Reporter
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
              Reason
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
              Reported On
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => {
            const id = report._id ?? report.id;
            const isResolved = report.status === "resolved" || report.status === "dismissed";

            return (
              <tr
                key={id}
                className="group border-b border-[#EAE0D3]/60 transition-colors last:border-0 hover:bg-[#FBF1E6]/60 dark:border-[#3A332A]/60 dark:hover:bg-[#1A1714]/60"
              >
                <td className="px-4 py-3">
                  <RecipeCell recipeId={report.recipeId} />
                </td>

                <td className="px-4 py-3">
                  <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                    {report.userEmail}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <ReasonBadge reason={report.reason} />
                </td>

                <td className="px-4 py-3">
                  <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleDateString(undefined, {
                          dateStyle: "medium",
                        })
                      : "—"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <ReportStatusBadge status={report.status} />
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      size="sm"
                      variant="light"
                      isDisabled={isResolved}
                      onPress={() => onDismiss?.(id)}
                      className="rounded-lg px-3 text-xs font-medium text-[#6B6155] hover:bg-[#F2EDE4] disabled:opacity-50 dark:text-[#B8AFA2] dark:hover:bg-[#2A251E]"
                    >
                      Dismiss
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      isDisabled={isResolved}
                      onPress={() => onRemoveRecipe?.(id, report.recipeId)}
                      className="rounded-lg px-3 text-xs font-medium text-[#C0392B] hover:bg-[#FBE9E7] disabled:opacity-50 dark:hover:bg-[#3A1F1B]"
                    >
                      Remove Recipe
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}