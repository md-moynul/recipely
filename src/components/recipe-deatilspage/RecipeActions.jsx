import LikeButton from "@/components/recipe-deatilspage/LikeButton";
import PurchaseButton from "@/components/recipe-deatilspage/PurchaseButton";
import ReportDialog from "@/components/recipe-deatilspage/ReportModal";
import SaveButton from "@/components/recipe-deatilspage/SaveButton";


export default function RecipeActions({
  recipeId,
  recipeName,
  initialLikes = 0,
  initialIsSaved = false,
  isPurchased = false,
  price,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <LikeButton recipeId={recipeId} initialLikes={initialLikes} />
      <SaveButton recipeId={recipeId} initialIsSaved={initialIsSaved} />
      <PurchaseButton recipeId={recipeId} isPurchased={isPurchased} price={price} />
      <ReportDialog recipeId={recipeId} recipeName={recipeName} />
    </div>
  );
}