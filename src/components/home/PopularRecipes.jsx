"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, Flame } from "@gravity-ui/icons";
import RecipePagination from "@/app/all-recipes/RecipePagination";

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

function PopularCard({ recipe }) {
  const id = recipe._id ?? recipe.id;

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
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}

        {recipe.likes != null ? (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#2B2420] backdrop-blur-sm dark:bg-[#252019]/90 dark:text-[#F4EDE4]">
            <Heart width={12} height={12} className="fill-[#E85D3D] text-[#E85D3D]" />
            {recipe.likes}
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          {recipe.recipeName}
        </h3>
        {recipe.authorName ? (
          <p className="mt-1 text-xs text-[#9C9388]">by {recipe.authorName}</p>
        ) : null}

        <Link
          href={`/all-recipes/${id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#E85D3D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

export default function PopularRecipesSection({ recipes }) {
  const recipeArray = recipes.recipes;
  const page = recipes.page;
  const totalPages = recipes.totalPages;
  if (!recipes || recipeArray.length === 0) return null;

  return (
    <section className="bg-[#FBF1E6]/30 px-4 py-16 dark:bg-[#1A1714]/30">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E85D3D]/10 px-3 py-1 text-xs font-semibold text-[#E85D3D]">
              <Flame width={14} height={14} />
              Trending
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#2B2420] sm:text-3xl dark:text-[#F4EDE4]">
              Popular Recipes
            </h2>
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
          {recipeArray.map((recipe) => (
            <PopularCard key={recipe._id ?? recipe.id} recipe={recipe} />
          ))}
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="flex justify-center "
      >
        <RecipePagination totalPages={totalPages} page={page} link="" />

      </motion.div>
    </section>
  );
}