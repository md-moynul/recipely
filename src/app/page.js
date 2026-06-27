import FeaturedRecipePage from "@/components/home/FeaturedRecipe";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PopularRecipes from "@/components/home/PopularRecipes";
import ReviewSection from "@/components/home/ReviewSection";

export default function Home() {
  return (
    <div className=" min-h-screen">
       <HeroSection />
       <FeaturedRecipePage />
       <PopularRecipes />
       <HowItWorksSection />
       <ReviewSection />
    </div>
  );
}
