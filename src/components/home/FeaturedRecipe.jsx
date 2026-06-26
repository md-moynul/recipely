// src/app/featured/page.jsx
import NormalRecipes from '@/app/all-recipes/NormalRecipes';
import { getFeaturedRecipe } from '@/lib/api/recipe';

const FeaturedRecipePage = async () => {
    const recipes = await getFeaturedRecipe();

    if (!recipes || recipes.length === 0) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                    Featured Recipes
                </h1>
                <p className="mt-4 text-[#9C9388] max-w-md mx-auto">
                    Featured recipes are only added by admin. 
                    Premium users can request to feature their recipe.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                        Featured Recipes
                    </h1>
                    <p className="mt-2 text-[#9C9388] max-w-md">
                        Featured recipes are only added by admin. 
                        Premium users can request to feature their recipe.
                    </p>
                </div>
                
                <span className="text-sm text-[#9C9388] whitespace-nowrap">
                    {recipes.length} featured recipe{recipes.length !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recipes.map((recipe) => (
                    <NormalRecipes 
                        key={recipe._id ?? recipe.id} 
                        recipe={recipe} 
                    />
                ))}
            </div>
        </div>
    );
};

export default FeaturedRecipePage;