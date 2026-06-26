import FeaturedRecipePage from "@/components/home/FeaturedRecipe";
import HeroSection from "@/components/home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen">
       <HeroSection />
       <FeaturedRecipePage />
    </div>
  );
}
