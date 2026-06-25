import { getRecipeByUserEmail, getRecipeByRecipeId } from "@/lib/api/recipe";
import { getServerSession } from "@/lib/core/session";
import FavoritesTable from "./FavoritesTable";

const favoritePage = async () => {
  const user = await getServerSession();
  const favoriteRecipe = await getRecipeByUserEmail(user?.email);

  // Handles both possible shapes: a plain array, or an object like
  // { favorites: [...] }. Adjust if your API differs.
  const rawFavorites = Array.isArray(favoriteRecipe)
    ? favoriteRecipe
    : favoriteRecipe?.favorites ?? [];

  const favorites = await Promise.all(
    rawFavorites.map(async (fav) => ({
      ...fav,
      recipe: (await getRecipeByRecipeId(fav.recipeId)) ?? DUMMY_RECIPE,
    }))
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          My Favorites
        </h1>
        <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
          Recipes you&apos;ve saved to come back to.
        </p>
      </div>

      <FavoritesTable favorites={favorites} />
    </div>
  );
};

export default favoritePage;