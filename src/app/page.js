import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PopularRecipesSection from "@/components/home/PopularRecipes";
import ReviewSection from "@/components/home/ReviewSection";
import FeaturedRecipesSection from "@/components/home/FeaturedRecipe";
import { getFeaturedRecipe, getPopularRecipes } from "@/lib/api/recipe";

// Async Wrapper for Featured Recipes
async function FeaturedSectionWrapper() {
  const featuredRecipes = await getFeaturedRecipe();
  return <FeaturedRecipesSection recipes={featuredRecipes} />;
}

// Async Wrapper for Popular Recipes
async function PopularSectionWrapper() {
  const popularRecipes = await getPopularRecipes();
  return <PopularRecipesSection recipes={popularRecipes} />;
}

// Skeleton for Featured Recipes Section
function FeaturedRecipesSkeleton() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-8 w-48 animate-pulse rounded-lg bg-[#EAE0D3] dark:bg-[#3A332A]" />
            <div className="mt-2 h-4 w-60 animate-pulse rounded-md bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
          </div>
          <div className="hidden h-5 w-20 animate-pulse rounded bg-[#EAE0D3]/60 sm:block dark:bg-[#3A332A]/60" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white p-0 dark:border-[#3A332A] dark:bg-[#252019]"
            >
              <div className="h-44 w-full animate-pulse bg-[#FBF1E6] dark:bg-[#1A1714]" />
              <div className="p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#EAE0D3] dark:bg-[#3A332A]" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                <div className="mt-4 h-9 w-full animate-pulse rounded-xl bg-[#EAE0D3] dark:bg-[#3A332A]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Skeleton for Popular Recipes Section
function PopularRecipesSkeleton() {
  return (
    <section className="bg-[#FBF1E6]/30 px-4 py-16 dark:bg-[#1A1714]/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-6 w-24 animate-pulse rounded-full bg-[#E85D3D]/20" />
            <div className="mt-3 h-8 w-48 animate-pulse rounded-lg bg-[#EAE0D3] dark:bg-[#3A332A]" />
          </div>
          <div className="hidden h-5 w-20 animate-pulse rounded bg-[#EAE0D3]/60 sm:block dark:bg-[#3A332A]/60" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white p-0 dark:border-[#3A332A] dark:bg-[#252019]"
            >
              <div className="h-44 w-full animate-pulse bg-[#FBF1E6] dark:bg-[#1A1714]" />
              <div className="p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#EAE0D3] dark:bg-[#3A332A]" />
                <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                <div className="mt-4 h-9 w-full animate-pulse rounded-xl bg-[#EAE0D3] dark:bg-[#3A332A]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero section immediately rendered */}
      <HeroSection />

      {/* 2. Featured recipes with isolated section skeleton loader */}
      <Suspense fallback={<FeaturedRecipesSkeleton />}>
        <FeaturedSectionWrapper />
      </Suspense>

      {/* 3. Popular recipes with isolated section skeleton loader */}
      <Suspense fallback={<PopularRecipesSkeleton />}>
        <PopularSectionWrapper />
      </Suspense>

      {/* 4. Static / Informational sections immediately rendered */}
      <HowItWorksSection />
      <ReviewSection />
    </div>
  );
}