"use client";

import { useState, useEffect } from "react";
import { Star, StarFill, Pencil, SealCheck, Xmark } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { addReview } from "@/lib/action/recipe";

const RATING_LABELS = {
  1: "Disappointing",
  2: "Could be better",
  3: "Good & tasty",
  4: "Very delicious",
  5: "Outstanding! Loved it",
};

export default function WriteReviewModal({
  isOpen,
  onClose,
  recipeId,
  recipeName = "Recipe",
  userExistingReview = null,
  onReviewSuccess,
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state whenever existing review changes or modal opens
  useEffect(() => {
    if (userExistingReview) {
      setRating(userExistingReview.rating || 5);
      setComment(userExistingReview.comment || "");
    } else {
      setRating(5);
      setComment("");
    }
  }, [userExistingReview, isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter your cooking feedback.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await addReview({
        recipeId,
        rating,
        comment: comment.trim(),
      });

      if (res.success || res.review) {
        toast.success(res.message || "Review posted successfully!");
        if (onReviewSuccess) {
          onReviewSuccess(res);
        }
        onClose();
      } else {
        toast.error(res.message || "Failed to submit review.");
      }
    } catch (err) {
      console.error("Review submission error:", err);
      toast.error("Error submitting review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-[#EAE0D3] bg-white p-6 sm:p-8 shadow-2xl transition-all duration-200 animate-in zoom-in-95 dark:border-[#3A332A] dark:bg-[#252019]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 cursor-pointer"
          aria-label="Close dialog"
        >
          <Xmark width={18} height={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E85D3D]/10 text-[#E85D3D]">
            <Pencil width={20} height={20} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
              {userExistingReview ? "Update Your Review" : "Write a Recipe Review"}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <SealCheck width={12} height={12} />
              Verified Buyer Status Active
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Star Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6155] dark:text-[#B8AFA2]">
              Your Overall Rating
            </label>
            <div className="mt-2.5 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="rounded-lg p-1 text-amber-500 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  {star <= (hoverRating || rating) ? (
                    <StarFill width={30} height={30} />
                  ) : (
                    <Star width={30} height={30} className="text-stone-300 dark:text-stone-600" />
                  )}
                </button>
              ))}
              <span className="ml-2 rounded-xl bg-[#FFF9F2] px-3 py-1 text-xs font-bold text-[#E85D3D] dark:bg-[#1A1714]">
                {RATING_LABELS[hoverRating || rating]}
              </span>
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6155] dark:text-[#B8AFA2]">
              Cooking Experience & Notes
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the flavor? Did you make any substitutions? Share your tips for other food lovers..."
              className="mt-2 w-full rounded-2xl border border-[#EAE0D3] bg-[#FFF9F2] p-4 text-sm text-[#2B2420] placeholder-stone-400 transition-all focus:border-[#E85D3D] focus:bg-white focus:ring-2 focus:ring-[#E85D3D]/20 focus:outline-none dark:border-[#3A332A] dark:bg-[#1A1714] dark:text-[#F4EDE4] dark:focus:bg-[#1A1714]"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-xs sm:text-sm font-medium text-[#6B6155] hover:bg-stone-100 dark:text-[#B8AFA2] dark:hover:bg-stone-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#E85D3D] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-[#D14E30] hover:shadow-lg disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting
                ? "Submitting..."
                : userExistingReview
                ? "Update Review"
                : "Post Verified Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
