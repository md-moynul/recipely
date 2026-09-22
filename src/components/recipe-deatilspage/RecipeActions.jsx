import LikeButton from "@/components/recipe-deatilspage/LikeButton";
import PurchaseButton from "@/components/recipe-deatilspage/PurchaseButton";
import AddToCartButton from "@/components/recipe-deatilspage/AddToCartButton";
import ReportDialog from "@/components/recipe-deatilspage/ReportModal";
import SaveButton from "@/components/recipe-deatilspage/SaveButton";
import { getRecipeByUserEmail } from "@/lib/api/recipe";
import { getServerSession } from "@/lib/core/session";

export default async function RecipeActions({
  recipeId,
  recipeName,
  recipeImage,
  category,
  cuisineType,
  preparationTime,
  initialLikes = 0,
  isPurchased = false,
  price,
  likedBy = [],
}) {
  const user = await getServerSession();
  const userId = user?.id;
  const isLiked = userId ? likedBy.includes(userId) : false;

  let initialIsSaved = false;
  if (user?.email) {
    try {
      const userFavorites = await getRecipeByUserEmail(user.email);
      if (Array.isArray(userFavorites)) {
        initialIsSaved = userFavorites.some(
          (fav) => String(fav.recipeId) === String(recipeId)
        );
      }
    } catch (error) {
      console.error("Failed to check saved recipe status:", error);
    }
  }

  const recipeObj = {
    _id: recipeId,
    recipeName,
    recipeImage,
    category,
    cuisineType,
    preparationTime,
    price,
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <LikeButton recipeId={recipeId} initialLikes={initialLikes} userId={userId} isLiked={isLiked} />
      <SaveButton recipeId={recipeId} initialIsSaved={initialIsSaved} userId={userId} userEmail={user?.email} />
      <AddToCartButton recipe={recipeObj} isPurchased={isPurchased} />
      <PurchaseButton recipeId={recipeId} isPurchased={isPurchased} price={price} />
      <ReportDialog recipeId={recipeId} recipeName={recipeName} />
    </div>
  );
}