
// app/recipes/[id]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { getRecipeByRecipeId, getRecipeReviews } from "@/lib/api/recipe";
import RecipeActions from "@/components/recipe-deatilspage/RecipeActions";
import PurchaseButton from "@/components/recipe-deatilspage/PurchaseButton";
import RecipeReviewsSection from "@/components/recipe-deatilspage/RecipeReviewsSection";
import RecipeIngredientsScaler from "@/components/recipe-deatilspage/RecipeIngredientsScaler";
import { getServerSession } from "@/lib/core/session";
import { redirect } from "next/navigation";


export default async function RecipeDetailsPage({ params }) {
  const { id } = await params;
  const user = await getServerSession();
  if (!user){
   redirect(`/auth/login?redirectBy=/all-recipes/${id}`);
  }
  
  const [recipe, reviewsData] = await Promise.all([
    getRecipeByRecipeId(id),
    getRecipeReviews(id).catch(() => ({ reviews: [], averageRating: 0, totalReviews: 0, ratingBreakdown: {} })),
  ]);
  const isPaid = recipe.paymentStatus === "paid";
  const isAuthor = user?.id === recipe.authorId;

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#EAE0D3] bg-white shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
        {/* Hero Cover Image Banner */}
        <div className="relative h-80 w-full bg-[#FBF1E6] sm:h-100 dark:bg-[#1A1714]">
          {recipe.recipeImage && (
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName || "Recipe Image"}
              fill
              priority
              className="object-cover"
            />
          )}
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
                recipeImage={recipe.recipeImage}
                category={recipe.category}
                cuisineType={recipe.cuisineType}
                preparationTime={recipe.preparationTime}
                initialLikes={recipe.likes}
                likedBy={recipe.likedBy || []}
                userId={user?.id}
                price={recipe.price}
                isPurchased={isPaid}
              />
            </div>
          </div>

          {/* Recipe Metrics Meta Section */}
          <div className="my-6 grid grid-cols-2 gap-4 rounded-2xl bg-[#FBF1E6]/50 p-4 text-center sm:grid-cols-4 dark:bg-[#1A1714]/40">
            <div>
              <p className="text-xs font-semibold uppercase text-stone-400 dark:text-stone-500">
                Prep Time
              </p>
              <p className="mt-0.5 text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                {recipe.preparationTime || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-stone-400 dark:text-stone-500">
                Difficulty
              </p>
              <p className="mt-0.5 text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                {recipe.difficultyLevel || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-stone-400 dark:text-stone-500">
                Price
              </p>
              <p className="mt-0.5 text-lg font-bold text-[#E85D3D]">
                {recipe.price ? `$${recipe.price}` : "Free"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-stone-400 dark:text-stone-500">
                Status
              </p>
              <p className="mt-0.5 text-sm font-medium capitalize text-green-600 dark:text-green-400">
                {isPaid ? "Unlocked" : "Locked"}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Left Content Column: Ingredients & Instructions */}
            <div className="space-y-6 md:col-span-2">
              {isPaid ? (
                <>
                  {/* Dynamic Serving Scaler & Ingredients Checklist */}
                  <RecipeIngredientsScaler
                    ingredients={recipe.ingredients || []}
                    baseServings={recipe.servings || 4}
                  />

                  <div className="pt-2">
                    <h2 className="mb-2 text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                      Instructions
                    </h2>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-stone-600 dark:text-stone-300">
                      {recipe.instructions}
                    </p>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#EAE0D3] bg-[#FBF1E6]/50 p-8 text-center dark:border-[#3A332A] dark:bg-[#1A1714]/40">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E85D3D]/10 text-[#E85D3D]">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                    Ingredients & Instructions Locked
                  </h3>
                  <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                    Please purchase this recipe to unlock the ingredients list and full step-by-step instructions.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <PurchaseButton
                      recipeId={recipe._id}
                      isPurchased={false}
                      price={recipe.price}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Author Profile Card */}
            <div className="md:col-span-1">
              <div className="rounded-2xl border border-[#EAE0D3] bg-stone-50/50 p-5 text-center dark:border-[#3A332A] dark:bg-[#1A1714]/20">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Recipe Creator
                </p>
                <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full border-2 border-[#E85D3D]">
                  {recipe.authorImage ? (
                    <Image
                      src={recipe.authorImage}
                      alt={recipe.authorName || "Author Image"}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                  {recipe.authorName || "Unknown Author"}
                </h3>
                {recipe.createdAt && (
                  <p className="mt-1 text-xs text-stone-400">
                    Posted on{" "}
                    {new Date(recipe.createdAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Reviews & Verified Rating Section */}
          <RecipeReviewsSection
            recipeId={recipe._id}
            isPaid={isPaid}
            isAuthor={isAuthor}
            user={user}
            price={recipe.price}
            initialReviews={reviewsData?.reviews || []}
            initialAvgRating={reviewsData?.averageRating || 0}
            initialTotalReviews={reviewsData?.totalReviews || 0}
            initialBreakdown={reviewsData?.ratingBreakdown || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }}
          />
        </div>
      </div>
    </main>
  );
}