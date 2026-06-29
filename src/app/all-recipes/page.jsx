import { getAllRecipes } from "@/lib/api/recipe";
import NormalRecipes from "./NormalRecipes";
import RecipeFilterBar from "./RecipeFilterBar";
import { GraduationCap } from "@gravity-ui/icons";
import RecipePagination from "./RecipePagination";

const AllRecipesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const paramsObj = new URLSearchParams(params);
  const paramsStr = paramsObj.toString();
  const recipeData = await getAllRecipes(paramsStr);
  const paramsPage = paramsObj.get("page");
  const recipes = recipeData?.data;
  const page = Number(recipeData?.page) || 1;
  const totalPages = recipeData?.totalPages;

  if (!recipes || recipes.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#2B2420] sm:text-3xl dark:text-[#F4EDE4]">
            Browse Recipes
          </h1>
          <p className="mt-2 text-sm text-[#9C9388]">
            Discover something worth cooking, shared by the community.
          </p>
        </div>

        <RecipeFilterBar paramsObj={paramsObj} page={page} />

        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-[#EAE0D3] py-16 text-center dark:border-[#3A332A]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full">
            <GraduationCap width={26} height={26}  />
          </div>
          <p className="mt-4 text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
            No recipes found
          </p>
          <p className="mt-1 text-sm text-[#9C9388]">
            Try adjusting your filters, or check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <h1 className="text-2xl font-bold text-[#2B2420] sm:text-3xl dark:text-[#F4EDE4]">
            Browse Recipes
          </h1>
          <p className="mt-1 text-sm text-[#9C9388]">
            Discover something worth cooking, shared by the community.
          </p>
        </div>
        <span >
          {recipes.length} recipe{recipes.length === 1 ? "" : "s"}
        </span>
      </div>

      <RecipeFilterBar paramsObj={paramsObj} page={page} />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <NormalRecipes key={recipe._id ?? recipe.id} recipe={recipe} />
        ))}
      </div>

      <RecipePagination page={page} totalPages={totalPages} paramsStr={paramsStr} />
    </div>
  );
};

export default AllRecipesPage;