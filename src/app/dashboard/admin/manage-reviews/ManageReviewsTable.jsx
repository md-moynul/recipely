"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Table, Button } from "@heroui/react";
import {
  StarFill,
  TrashBin,
  Eye,
  Magnifier,
  SealCheck,
  Comment,
  Person,
} from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { deleteReview } from "@/lib/action/recipe";

export default function ManageReviewsTable({ initialReviews = [] }) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  // Metrics
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";
  const fiveStarCount = reviews.filter((r) => Number(r.rating) === 5).length;
  const uniqueReviewers = new Set(reviews.map((r) => r.userId || r.userName)).size;

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      const matchesRating =
        ratingFilter === "all" || Number(rev.rating) === Number(ratingFilter);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        rev.recipeName?.toLowerCase().includes(q) ||
        rev.userName?.toLowerCase().includes(q) ||
        rev.comment?.toLowerCase().includes(q);

      return matchesRating && matchesSearch;
    });
  }, [reviews, searchQuery, ratingFilter]);

  const handleDelete = async (reviewId) => {
    if (
      !confirm(
        "Are you sure you want to delete this review? This action cannot be undone and will recalculate the recipe's average score."
      )
    ) {
      return;
    }

    setDeletingId(reviewId);
    try {
      const res = await deleteReview(reviewId);
      if (res?.success || res?.message?.toLowerCase().includes("success")) {
        toast.success("Review deleted successfully.");
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete review.");
      }
    } catch (err) {
      console.error("Delete review error:", err);
      toast.error("An error occurred while deleting the review.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {/* 1. Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#EAE0D3] bg-white p-4.5 shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E85D3D]/10 text-[#E85D3D]">
              <Comment width={20} height={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-[#9C9388] dark:text-[#8A8074]">
                Total Reviews
              </p>
              <p className="text-xl font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                {totalReviews}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE0D3] bg-white p-4.5 shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <StarFill width={20} height={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-[#9C9388] dark:text-[#8A8074]">
                Platform Avg Score
              </p>
              <div className="flex items-center gap-1.5">
                <p className="text-xl font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                  {avgRating}
                </p>
                <span className="text-xs text-[#9C9388]">/ 5.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE0D3] bg-white p-4.5 shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <SealCheck width={20} height={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-[#9C9388] dark:text-[#8A8074]">
                5-Star Ratings
              </p>
              <p className="text-xl font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                {fiveStarCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE0D3] bg-white p-4.5 shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Person width={20} height={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-[#9C9388] dark:text-[#8A8074]">
                Unique Reviewers
              </p>
              <p className="text-xl font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                {uniqueReviewers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-[#EAE0D3] bg-white p-4 dark:border-[#3A332A] dark:bg-[#252019]">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#9C9388]">
            <Magnifier width={16} height={16} />
          </div>
          <input
            type="text"
            placeholder="Search by recipe name, reviewer, or review text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#EAE0D3] bg-[#FBF8F3] py-2.5 pl-10 pr-4 text-sm text-[#2B2420] placeholder-[#9C9388] transition-colors focus:border-[#E85D3D] focus:outline-none dark:border-[#3A332A] dark:bg-[#1F1B16] dark:text-[#F4EDE4] dark:placeholder-[#7A7266]"
          />
        </div>

        {/* Rating filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { label: "All Stars", value: "all" },
            { label: "5 ★", value: "5" },
            { label: "4 ★", value: "4" },
            { label: "3 ★", value: "3" },
            { label: "2 ★", value: "2" },
            { label: "1 ★", value: "1" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setRatingFilter(item.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                ratingFilter === item.value
                  ? "bg-[#E85D3D] text-white"
                  : "bg-[#F4EDE4] text-[#6B6155] hover:bg-[#EAE0D3] dark:bg-[#332C24] dark:text-[#B8AFA2] dark:hover:bg-[#3E362C]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Data Table */}
      {filteredReviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#EAE0D3] p-12 text-center dark:border-[#3A332A]">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBF1E6] text-[#9C9388] dark:bg-[#1A1714]">
            <Comment width={24} height={24} />
          </div>
          <p className="text-base font-medium text-[#2B2420] dark:text-[#F4EDE4]">
            No reviews match your filter
          </p>
          <p className="mt-1 text-sm text-[#9C9388]">
            Try adjusting your search terms or star rating filter.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#EAE0D3] shadow-sm dark:border-[#3A332A]">
          <Table
            aria-label="Manage reviews table"
            className="bg-white dark:bg-[#252019]"
          >
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header className="bg-[#FBF8F3] dark:bg-[#1F1B16]">
                  <Table.Column
                    isRowHeader
                    className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]"
                  >
                    Recipe
                  </Table.Column>
                  <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                    Reviewer
                  </Table.Column>
                  <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                    Rating
                  </Table.Column>
                  <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074] min-w-[280px]">
                    Feedback & Comment
                  </Table.Column>
                  <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                    Date
                  </Table.Column>
                  <Table.Column
                    align="end"
                    className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]"
                  >
                    Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {filteredReviews.map((rev) => {
                    const id = String(rev._id);
                    const isDeleting = deletingId === id;
                    const dateFormatted = rev.createdAt
                      ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently";

                    return (
                      <Table.Row
                        key={id}
                        className="group border-b border-[#EAE0D3]/60 transition-colors last:border-0 hover:bg-[#FBF1E6]/50 dark:border-[#3A332A]/60 dark:hover:bg-[#1A1714]/50"
                      >
                        {/* 1. Recipe info */}
                        <Table.Cell>
                          <div className="flex items-center gap-3 py-1.5">
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#FBF1E6] ring-1 ring-[#EAE0D3] dark:bg-[#1A1714] dark:ring-[#3A332A]">
                              {rev.recipeImage ? (
                                <Image
                                  src={rev.recipeImage}
                                  alt={rev.recipeName || "Recipe"}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#C9BFAF]">
                                  <Comment width={16} height={16} />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 max-w-[200px]">
                              <Link
                                href={`/all-recipes/${rev.recipeId}`}
                                className="block truncate font-medium text-sm text-[#2B2420] hover:text-[#E85D3D] transition-colors dark:text-[#F4EDE4] dark:hover:text-[#E85D3D]"
                                title={rev.recipeName}
                              >
                                {rev.recipeName || "Recipe"}
                              </Link>
                              {rev.category && (
                                <span className="inline-block text-[11px] text-[#9C9388]">
                                  {rev.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </Table.Cell>

                        {/* 2. Reviewer */}
                        <Table.Cell>
                          <div className="flex items-center gap-2.5">
                            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#EAE0D3] ring-1 ring-[#EAE0D3] dark:bg-[#3A332A]">
                              {rev.userImage ? (
                                <Image
                                  src={rev.userImage}
                                  alt={rev.userName || "User"}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#9C9388]">
                                  <Person width={14} height={14} />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                                {rev.userName || "Customer"}
                              </p>
                              {rev.isVerifiedBuyer && (
                                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                  <SealCheck width={12} height={12} />
                                  <span>Verified</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Table.Cell>

                        {/* 3. Rating Stars */}
                        <Table.Cell>
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center text-amber-500">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <StarFill
                                  key={s}
                                  width={13}
                                  height={13}
                                  className={
                                    s <= Number(rev.rating)
                                      ? "text-amber-500"
                                      : "text-[#E0D7CC] dark:text-[#4A4237]"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                              {rev.rating}.0
                            </span>
                          </div>
                        </Table.Cell>

                        {/* 4. Comment */}
                        <Table.Cell>
                          <p className="text-sm text-[#4A4036] dark:text-[#D1C7BB] line-clamp-3 leading-relaxed max-w-[340px]">
                            {rev.comment}
                          </p>
                        </Table.Cell>

                        {/* 5. Date */}
                        <Table.Cell>
                          <span className="text-xs text-[#9C9388] whitespace-nowrap">
                            {dateFormatted}
                          </span>
                        </Table.Cell>

                        {/* 6. Actions */}
                        <Table.Cell align="end">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/all-recipes/${rev.recipeId}`}>
                              <Button
                                size="sm"
                                variant="light"
                                className="h-8 min-w-8 p-0 text-[#6B6155] hover:text-[#2B2420] dark:text-[#B8AFA2] dark:hover:text-white"
                                title="View Recipe Page"
                              >
                                <Eye width={15} height={15} />
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="light"
                              disabled={isDeleting}
                              onClick={() => handleDelete(id)}
                              className="h-8 min-w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                              title="Delete Review (Spam / Inappropriate)"
                            >
                              <TrashBin width={15} height={15} />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
}
