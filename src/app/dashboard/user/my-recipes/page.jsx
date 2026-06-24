import Link from "next/link";
import { getServerSession } from "@/lib/core/session";
import MyRecipesTable from "./MyRecipesTable";
import { getRecipeByAuthorId } from "@/lib/api/recipe";

const MyRecipePage = async () => {
  const user = await getServerSession();
  const result = await getRecipeByAuthorId(user?.id);

  // Handles both possible shapes from getRecipes: a plain array, or
  // an object like { recipes: [...] }. Adjust if your API differs.
  const recipes = Array.isArray(result) ? result : result?.recipes ?? [];

  return (
    <div className="mx-auto w-full container px-6 py-10">
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

      {/* `recipes` is plain serializable data (array of objects) — safe to
          pass from this Server Component into the client Table component. */}
      <MyRecipesTable recipes={recipes} />
    </div>
  );
};

export default MyRecipePage;