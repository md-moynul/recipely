// app/recipes/[id]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { getRecipeByRecipeId } from "@/lib/api/recipe";
import RecipeActions from "@/components/recipe-deatilspage/RecipeActions";
import { getServerSession } from "@/lib/core/session";


export default async function RecipeDetailsPage({ params }) {
  const { id } = await params;
  const recipe = await getRecipeByRecipeId(id);
  const user = await getServerSession();

  return (
    <main className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#EAE0D3] bg-white shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
        {/* Hero Cover Image Banner */}
        <div className="relative h-80 w-full bg-[#FBF1E6] sm:h-100 dark:bg-[#1A1714]">
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          <Link
            href="/all-recipes"
            className="absolute top-6 left-6 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-stone-800 backdrop-blur transition-all hover:bg-white dark:bg-black/80 dark:text-stone-200"
          >
            ← Back to Recipes
          </Link>
        </div>

        {/* Content Layout Body */}
        <div className="p-6 sm:p-10">
          {/* Header Action Row */}
          <div className="flex flex-col gap-4 border-b border-[#EAE0D3] pb-6 sm:flex-row sm:items-start sm:justify-between dark:border-[#3A332A]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E85D3D]">
                {recipe.cuisineType} • {recipe.category}
              </span>
              <h1 className="mt-1 text-2xl font-bold text-[#2B2420] sm:text-3xl dark:text-[#F4EDE4]">
                {recipe.recipeName}
              </h1>
            </div>

            {/* Integrated Action Cluster */}
            <div className="shrink-0">
              <RecipeActions
                recipeId={recipe._id}
                recipeName={recipe.recipeName}
                initialLikes={recipe.likes}
                likedBy={recipe.likedBy}
                userId={user?.id}
              />
            </div>
          </div>

          {/* Recipe Metrics Meta Section */}
          <div className="my-6 grid grid-cols-3 gap-4 rounded-2xl bg-[#FBF1E6]/50 p-4 text-center dark:bg-[#1A1714]/40">
            <div>
              <p className="text-xs font-semibold uppercase text-stone-400 dark:text-stone-500">
                Prep Time
              </p>
              <p className="mt-0.5 text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                {recipe.preparationTime}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-stone-400 dark:text-stone-500">
                Difficulty
              </p>
              <p className="mt-0.5 text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                {recipe.difficultyLevel}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-stone-400 dark:text-stone-500">
                Status
              </p>
              <p className="mt-0.5 text-sm font-medium capitalize text-green-600 dark:text-green-400">
                {recipe.status}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Left Content Column: Ingredients & Instructions */}
            <div className="space-y-6 md:col-span-2">
              <div>
                <h2 className="mb-3 text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients?.map((ingredient, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-300"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E85D3D]" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-2 text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                  Instructions
                </h2>
                <p className="text-sm leading-relaxed whitespace-pre-line text-stone-600 dark:text-stone-300">
                  {recipe.instructions}
                </p>
              </div>
            </div>

            {/* Right Column: Author Profile Card */}
            <div className="md:col-span-1">
              <div className="rounded-2xl border border-[#EAE0D3] bg-stone-50/50 p-5 text-center dark:border-[#3A332A] dark:bg-[#1A1714]/20">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Recipe Creator
                </p>
                <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full border-2 border-[#E85D3D]">
                  <Image
                    src={recipe.authorImage}
                    alt={recipe.authorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                  {recipe.authorName}
                </h3>
                <p className="mt-1 text-xs text-stone-400">
                  Posted on{" "}
                  {new Date(recipe.createdAt).toLocaleDateString(undefined, {
                    dateStyle: "medium",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}