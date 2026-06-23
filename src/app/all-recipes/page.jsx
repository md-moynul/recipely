
import { getAllRecipes } from "@/lib/api/recipe";
import NormalRecipes from "./NormalRecipes";

const AllRecipesPage = async () => {
  const recipes = await getAllRecipes();

  if (!recipes || recipes.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
          No recipes found yet
        </p>
        <p className="mt-1 text-sm text-[#9C9388]">
          Check back soon, or be the first to share one.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          Browse Recipes
        </h1>
        <span className="text-sm text-[#9C9388]">
          {recipes.length} recipe{recipes.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <NormalRecipes key={recipe._id ?? recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipesPage;