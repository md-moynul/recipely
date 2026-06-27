import FeaturedRecipePage from "@/components/home/FeaturedRecipe";
import HeroSection from "@/components/home/HeroSection";
import PopularRecipes from "@/components/home/PopularRecipes";
import ReviewSection from "@/components/home/ReviewSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen">
       <HeroSection />
       <FeaturedRecipePage />
       <PopularRecipes />
       <ReviewSection />
    </div>
  );
}
