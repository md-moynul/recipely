"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Star } from "@gravity-ui/icons";

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

        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#F4A340] px-2.5 py-1 text-xs font-semibold  text-white">
          <Star width={12} height={12} />
          Featured
        </span>
      </div>

      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          {recipe.recipeName}
        </h3>
        <p className="mt-1 text-xs text-[#9C9388]">
          {recipe.category} · {recipe.cuisineType}
        </p>
        {recipe.preparationTime ? (
          <p className="mt-1 text-xs text-[#6B6155] dark:text-[#B8AFA2]">
            {recipe.preparationTime}
          </p>
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

export default function FeaturedRecipesSection({ recipes }) {
  if (!recipes || recipes.length === 0) return null;

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
            href="/featured"
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
          {recipes.slice(0, 4).map((recipe) => (
            <FeaturedCard key={recipe._id ?? recipe.id} recipe={recipe} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}