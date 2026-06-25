import { getAllRecipes } from "@/lib/api/recipe";
import ManageRecipesTable from "./ManageRecipesTable";

const ManageRecipePage = async () => {
  const result = await getAllRecipes();

  const recipes = Array.isArray(result)
    ? result
    : result?.recipes ?? [];

  return (
    <div className="mx-auto w-full container px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            Manage Recipes
          </h1>
          <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
            Review, edit, feature, and manage all recipes across the platform.
          </p>
        </div>
      </div>

      <ManageRecipesTable recipes={recipes} />
    </div>
  );
};

export default ManageRecipePage;