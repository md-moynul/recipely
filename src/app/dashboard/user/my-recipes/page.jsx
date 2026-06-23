import Link from "next/link";
import { getRecipes } from "@/lib/api/recipe";
import { getServerSession } from "@/lib/core/session";
import RecipeCard from "./RecipeCard";


const MyRecipePage = async () => {
  const user = await getServerSession();
  const result = await getRecipes(user?.id);

  // Handles both possible shapes from getRecipes: a plain array, or
  // an object like { recipes: [...] }. Adjust if your API differs.
  const recipes = Array.isArray(result) ? result : result?.recipes ?? [];

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            My Recipes
          </h1>
          <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
            Manage the recipes you&apos;ve shared.
          </p>
        </div>
        <Link
          href="/dashboard/user/add-recipe"
          className="rounded-xl bg-[#E85D3D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
        >
          + Add Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-[#EAE0D3] p-12 text-center dark:border-[#3A332A]">
          <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
            You haven&apos;t added any recipes yet
          </p>
          <p className="mt-1 text-sm text-[#9C9388]">
            Start sharing something worth cooking again.
          </p>
          <Link
            href="/dashboard/user/add-recipe"
            className="mt-5 inline-block rounded-xl bg-[#E85D3D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
          >
            Add your first recipe
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id ?? recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipePage;