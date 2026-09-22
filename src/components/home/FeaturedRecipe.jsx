"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Star, StarFill, Check } from "@gravity-ui/icons";
import { CartIcon } from "@/components/shared/CartIcon";
import { useCart } from "@/context/CartContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function FeaturedCard({ recipe }) {
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
    <motion.div
      variants={item}
      className="group overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white dark:border-[#3A332A] dark:bg-[#252019]"
    >
      <div className="relative h-44 w-full overflow-hidden bg-[#FBF1E6] dark:bg-[#1A1714]">
        {recipe.recipeImage ? (
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}

        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#F4A340] px-2.5 py-1 text-xs font-semibold  text-white">
          <StarFill width={12} height={12} />
          Featured
        </span>

        {isPaid && (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-xs">
            ${recipe.price}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 truncate text-sm font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            {recipe.recipeName}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 shrink-0">
            <StarFill width={12} height={12} className="text-amber-500" />
            <span className="text-xs font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
              {Number(recipe.averageRating) > 0 ? Number(recipe.averageRating).toFixed(1) : "0"}
            </span>
            <span className="text-[10px] text-[#9C9388]">
              ({recipe.totalReviews || recipe.reviewCount || 0})
            </span>
          </div>
        </div>

        <p className="mt-1 text-xs text-[#9C9388]">
          {recipe.category} · {recipe.cuisineType}
        </p>
        {recipe.preparationTime ? (
          <p className="mt-1 text-xs text-[#6B6155] dark:text-[#B8AFA2]">
            {recipe.preparationTime}
          </p>
        ) : null}

        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/all-recipes/${id}`}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#E85D3D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D14E30] cursor-pointer"
          >
            View Details
          </Link>

          {isPaid && (
            <button
              onClick={handleCartClick}
              title={inCart ? "In Cart (Click to open)" : "Add to Cart"}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                inCart
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "border-[#EAE0D3] bg-stone-50 text-[#2B2420] hover:border-[#E85D3D] hover:bg-[#FFF9F2] hover:text-[#E85D3D] dark:border-[#3A332A] dark:bg-[#1A1714] dark:text-[#F4EDE4] dark:hover:border-[#FF7A52] dark:hover:text-[#FF7A52]"
              }`}
            >
              {inCart ? <Check width={16} height={16} /> : <CartIcon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedRecipesSection({ recipes }) {
  const recipeList = (Array.isArray(recipes) ? recipes : recipes?.recipes || []).slice(0, 8);
  if (!recipeList || recipeList.length === 0) return null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-[#2B2420] sm:text-3xl dark:text-[#F4EDE4]">
              Featured Recipes
            </h2>
            <p className="mt-1 text-sm text-[#9C9388]">
              Hand-picked by the Recipely team
            </p>
          </div>
          <Link
            href="/all-recipes"
            className="hidden text-sm font-medium text-[#E85D3D] hover:text-[#D14E30] sm:block"
          >
            View all →
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {recipeList.map((recipe) => (
            <FeaturedCard key={recipe._id ?? recipe.id} recipe={recipe} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}