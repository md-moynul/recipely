"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, GraduationCap, HeartFill, SealCheck, StarFill, Check } from "@gravity-ui/icons";
import { CartIcon } from "@/components/shared/CartIcon";
import { useCart } from "@/context/CartContext";

export default function NormalRecipes({ recipe }) {
  const id = recipe._id ?? recipe.id;
  const { addToCart, isInCart, openCart } = useCart();

  const isPaid = Boolean(recipe.price && Number(recipe.price) > 0);
  const inCart = isInCart(id);

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      openCart();
    } else {
      addToCart(recipe);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white transition-all duration-300 hover:shadow-xl dark:border-[#3A332A] dark:bg-[#252019]">
      <div className="relative h-48 w-full overflow-hidden bg-[#FBF1E6] dark:bg-[#1A1714]">
        {recipe.recipeImage ? (
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#C9BFAF]">
            <GraduationCap width={40} height={40} />
          </div>
        )}

        {/* Category Badge */}
        {recipe.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#2B2420] shadow-sm backdrop-blur-sm dark:bg-[#252019]/95 dark:text-[#F4EDE4]">
            {recipe.category}
          </span>
        )}

        {/* Featured Badge */}
        {recipe.isFeatured && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-linear-to-r from-amber-500 to-yellow-600 px-3 py-1 text-xs font-semibold text-white shadow-lg ring-1 ring-white/30">
            <SealCheck width={16} height={16} className="drop-shadow-sm" />
            <span>Featured</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 line-clamp-1 text-base font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            {recipe.recipeName}
          </h3>

          {recipe.price && (
            <div className="shrink-0 rounded-xl bg-[#E85D3D] px-3 py-1 text-sm font-bold text-white shadow-sm">
              ${recipe.price}
            </div>
          )}
        </div>

        {/* Author & Rating / Reviews Bar */}
        <div className="mt-3 flex items-center justify-between gap-2">
          {recipe.authorName ? (
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative h-6 w-6 overflow-hidden rounded-full bg-[#FBF1E6] dark:bg-[#1A1714] ring-1 ring-white dark:ring-[#3A332A] shrink-0">
                {recipe.authorImage ? (
                  <Image
                    src={recipe.authorImage}
                    alt={recipe.authorName}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <span className="text-xs text-[#6B6155] dark:text-[#B8AFA2] truncate">
                {recipe.authorName}
              </span>
            </div>
          ) : <div />}

          <div className="flex items-center gap-3 shrink-0">
            {/* Reviews / Rating Badge */}
            <div className="flex items-center gap-1 text-amber-500">
              <StarFill width={14} height={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                {Number(recipe.averageRating) > 0 ? Number(recipe.averageRating).toFixed(1) : "0"}
              </span>
              <span className="text-[11px] text-[#9C9388]">
                ({recipe.totalReviews || recipe.reviewCount || 0})
              </span>
            </div>

            {/* Likes */}
            {typeof recipe.likes === "number" && (
              <div className="flex items-center gap-1 text-[#E85D3D]">
                <HeartFill width={15} height={15} />
                <span className="text-xs font-medium">{recipe.likes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
          {recipe.cuisineType && <span>{recipe.cuisineType}</span>}

          {recipe.difficultyLevel && <span>{recipe.difficultyLevel}</span>}

          {recipe.preparationTime && (
            <span className="flex items-center gap-1.5">
              <Clock width={15} height={15} />
              {recipe.preparationTime}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Link
            href={`/all-recipes/${id}`}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#E85D3D] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#D14E30] active:scale-[0.985] cursor-pointer"
          >
            View Details
          </Link>

          {isPaid && (
            <button
              onClick={handleCartClick}
              title={inCart ? "In Cart (Click to open)" : "Add to Cart"}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                inCart
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "border-[#EAE0D3] bg-stone-50 text-[#2B2420] hover:border-[#E85D3D] hover:bg-[#FFF9F2] hover:text-[#E85D3D] dark:border-[#3A332A] dark:bg-[#1A1714] dark:text-[#F4EDE4] dark:hover:border-[#FF7A52] dark:hover:text-[#FF7A52]"
              }`}
            >
              {inCart ? <Check width={18} height={18} /> : <CartIcon className="w-[18px] h-[18px]" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}