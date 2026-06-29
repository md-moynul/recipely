import FeaturedRecipesSection from "@/components/home/FeaturedRecipe";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PopularRecipesSection from "@/components/home/PopularRecipes";
import ReviewSection from "@/components/home/ReviewSection";
import { getFeaturedRecipe, getPopularRecipes } from "@/lib/api/recipe";


export default async function Home({searchParams}) {
  const params = await searchParams;
  const paramsObj = new URLSearchParams(params);
  const paramsStr = paramsObj.toString();
  console.log(paramsStr);
  const [featuredRecipes, popularRecipes] = await Promise.all([getFeaturedRecipe(paramsStr),getPopularRecipes(paramsStr)]); 

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