"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, StarFill, Lock, SealCheck, TrashBin, Comment, Pencil } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { deleteReview } from "@/lib/action/recipe";
import PurchaseButton from "./PurchaseButton";
import WriteReviewModal from "./WriteReviewModal";

export default function RecipeReviewsSection({
  recipeId,
  recipeName = "Recipe",
  isPaid = false,
  isAuthor = false,
  user = null,
  price,
  initialReviews = [],
  initialAvgRating = 0,
  initialTotalReviews = 0,
  initialBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [avgRating, setAvgRating] = useState(initialAvgRating);
  const [totalReviews, setTotalReviews] = useState(initialTotalReviews);
  const [breakdown, setBreakdown] = useState(initialBreakdown);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);

  // Find user's existing review
  const userExistingReview = user ? reviews.find((r) => r.userId === user.id) : null;

  const handleReviewSuccess = (res) => {
    const updatedReview = res.review;
    setReviews((prev) => {
      const index = prev.findIndex((r) => r.userId === user.id);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = updatedReview;
        return copy;
      }
      return [updatedReview, ...prev];
    });

    if (res.averageRating !== undefined) setAvgRating(res.averageRating);
    if (res.totalReviews !== undefined) setTotalReviews(res.totalReviews);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm("Are you sure you want to delete your review?")) return;

    setIsDeletingId(reviewId);
    try {
      const res = await deleteReview(reviewId);
      if (res.success) {
        toast.success("Review deleted.");
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        setTotalReviews((prev) => Math.max(0, prev - 1));
      } else {
        toast.error(res.message || "Failed to delete review.");
      }
    } catch (err) {
      console.error("Delete review error:", err);
      toast.error("Failed to delete review.");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <section className="mt-12 rounded-3xl border border-[#EAE0D3] bg-white p-6 sm:p-8 shadow-xs dark:border-[#3A332A] dark:bg-[#252019]">
      {/* Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#EAE0D3] pb-6 dark:border-[#3A332A]">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-[#2B2420] sm:text-2xl dark:text-[#F4EDE4]">
              Customer Reviews
            </h2>
            {totalReviews > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <StarFill width={13} height={13} />
                {avgRating.toFixed(1)} ({totalReviews})
              </span>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#6B6155] dark:text-[#B8AFA2]">
            Feedback & ratings from verified cooks
          </p>
        </div>

        {/* Action Button: Verified Buyer Write/Edit Review */}
        {isPaid && !isAuthor && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E85D3D] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#D14E30] hover:shadow-md cursor-pointer"
          >
            <Pencil width={15} height={15} />
            {userExistingReview ? "Edit Your Review" : "Write a Review"}
          </button>
        )}
      </div>

      {/* Locked Callout Banner (when user hasn't unlocked the recipe) */}
      {!isPaid && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-[#FFF9F2] p-5 sm:flex-row sm:p-6 dark:border-amber-500/15 dark:bg-[#1A1714]">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E85D3D]/10 text-[#E85D3D]">
              <Lock width={20} height={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                Verified Buyer Reviews Only
              </h4>
              <p className="mt-0.5 text-xs text-[#6B6155] dark:text-[#B8AFA2]">
                Purchase this recipe to unlock the full ingredients, cooking steps, and share your experience.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {user ? (
              <PurchaseButton recipeId={recipeId} isPurchased={false} price={price} />
            ) : (
              <Link
                href={`/auth/login?redirectBy=/all-recipes/${recipeId}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#E85D3D] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#D14E30]"
              >
                Sign In to Unlock
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area: Score Summary & Reviews List */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Overall Rating & Progress Bars */}
        {totalReviews > 0 ? (
          <div className="rounded-2xl border border-[#EAE0D3] bg-[#FFF9F2] p-5 sm:p-6 shadow-2xs dark:border-[#3A332A] dark:bg-[#1A1714]">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-extrabold text-[#2B2420] dark:text-[#F4EDE4]">
                {avgRating.toFixed(1)}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {star <= Math.round(avgRating) ? (
                        <StarFill width={16} height={16} />
                      ) : (
                        <Star width={16} height={16} className="text-stone-300 dark:text-stone-600" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-xs text-[#6B6155] dark:text-[#B8AFA2]">
                  {totalReviews} verified {totalReviews === 1 ? "rating" : "ratings"}
                </p>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="mt-5 space-y-2 border-t border-[#EAE0D3] pt-4 dark:border-[#3A332A]">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = breakdown[star] || 0;
                const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-5 font-semibold text-[#6B6155] dark:text-[#B8AFA2]">{star}★</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
                      <div
                        className="h-full rounded-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-7 text-right text-[11px] text-stone-400">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-[#EAE0D3] bg-[#FFF9F2] p-8 text-center lg:col-span-3 dark:border-[#3A332A] dark:bg-[#1A1714]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E85D3D]/10 text-[#E85D3D]">
              <Comment width={22} height={22} />
            </div>
            <h4 className="mt-3 text-sm font-bold text-[#2B2420] dark:text-[#F4EDE4]">
              No customer reviews yet
            </h4>
            <p className="mt-1 text-xs text-[#6B6155] dark:text-[#B8AFA2]">
              {isPaid
                ? "You have unlocked this recipe! Click \"Write a Review\" above to share your rating."
                : "Be the first verified customer to cook this recipe and leave a rating!"}
            </p>
          </div>
        )}

        {/* Right: Community Reviews List */}
        {totalReviews > 0 && (
          <div className="space-y-3 lg:col-span-2">
            {reviews.map((rev, index) => {
              const isOwner = user && (user.id === rev.userId || user.role === "admin");
              const dateStr = rev.createdAt
                ? new Date(rev.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Recently";

              return (
                <div
                  key={rev._id || index}
                  className="rounded-2xl border border-[#EAE0D3] bg-[#FFF9F2] p-4 sm:p-5 shadow-2xs transition-all dark:border-[#3A332A] dark:bg-[#1A1714]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#FBF1E6] ring-1 ring-[#EAE0D3] dark:bg-[#252019] dark:ring-[#3A332A]">
                        {rev.userImage ? (
                          <Image
                            src={rev.userImage}
                            alt={rev.userName || "User avatar"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#E85D3D]">
                            {(rev.userName || "U").charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                            {rev.userName || "Food Lover"}
                          </h4>
                          {rev.isVerifiedBuyer && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              <SealCheck width={11} height={11} />
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400">{dateStr}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= (rev.rating || 5) ? (
                              <StarFill width={13} height={13} />
                            ) : (
                              <Star width={13} height={13} className="text-stone-300 dark:text-stone-600" />
                            )}
                          </span>
                        ))}
                      </div>

                      {isOwner && (
                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          disabled={isDeletingId === rev._id}
                          className="ml-1 rounded-lg p-1 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 cursor-pointer"
                          title="Delete review"
                        >
                          <TrashBin width={13} height={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#4A4036] dark:text-[#D5CDC3]">
                    {rev.comment}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Standalone Write Review Modal */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipeId={recipeId}
        recipeName={recipeName}
        userExistingReview={userExistingReview}
        onReviewSuccess={handleReviewSuccess}
      />
    </section>
  );
}
