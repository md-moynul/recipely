import LikeButton from "@/components/recipe-deatilspage/LikeButton";
import PurchaseButton from "@/components/recipe-deatilspage/PurchaseButton";
import ReportDialog from "@/components/recipe-deatilspage/ReportModal";
import SaveButton from "@/components/recipe-deatilspage/SaveButton";
import { getFavoritesRecipeByUserIDAndRecipeId } from "@/lib/api/recipe";
import { getServerSession } from "@/lib/core/session";


export default async function RecipeActions({
  recipeId,
  recipeName,
  initialLikes = 0,
  isPurchased = false,
  price,
  likedBy,
}) {
  const user =await getServerSession();
  const userId = user?.id;
  const isLiked = likedBy.includes(userId);  
 const initialIsSaved = false;
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <LikeButton recipeId={recipeId} initialLikes={initialLikes} userId={userId} isLiked={isLiked} />
      <SaveButton recipeId={recipeId} initialIsSaved={initialIsSaved} userId={userId} userEmail={user?.email}  />
      <PurchaseButton recipeId={recipeId} isPurchased={isPurchased} price={price} />
      <ReportDialog recipeId={recipeId} recipeName={recipeName} />
    </div>
  );
}