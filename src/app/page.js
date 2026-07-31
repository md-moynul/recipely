import FeaturedRecipesSection from "@/components/home/FeaturedRecipe";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PopularRecipesSection from "@/components/home/PopularRecipes";
import ReviewSection from "@/components/home/ReviewSection";
import { getFeaturedRecipe, getPopularRecipes } from "@/lib/api/recipe";


export default async function Home() {
  const [featuredRecipes, popularRecipes] = await Promise.all([
    getFeaturedRecipe(),
    getPopularRecipes(),
  ]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedRecipesSection recipes={featuredRecipes} />
      <PopularRecipesSection recipes={popularRecipes} />
      <HowItWorksSection />
      <ReviewSection />
    </div>
  );
}