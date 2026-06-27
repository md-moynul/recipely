// src/app/popular/page.jsx
import Image from "next/image";
import NormalRecipes from "@/app/all-recipes/NormalRecipes";
import { getPopularRecipes } from "@/lib/api/recipe";
import { Flame, Heart } from "@gravity-ui/icons";

const RANK_STYLES = [
  "bg-[#F4A340] text-[#2B2420]", // #1 gold
  "bg-[#D9CDB8] text-[#2B2420]", // #2 silver-ish
  "bg-[#E0B084] text-[#2B2420]", // #3 bronze-ish
];

const PopularRecipePage = async () => {
  const recipes = await getPopularRecipes();

  if (!recipes || recipes.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E85D3D]/10 px-3 py-1 text-xs font-semibold text-[#E85D3D]">
          <Flame width={14} height={14} />
          Popular Recipes
        </span>
        <h1 className="mt-4 text-3xl font-bold text-[#2B2420]">
          Nothing trending yet
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[#9C9388]">
          Start liking recipes to help the community discover what&apos;s worth
          cooking.
        </p>
      </div>
    );
  }

  const [topThree, rest] = [recipes.slice(0, 3), recipes.slice(3)];

  return (
    <div className="bg-[#FBF1E6]/30">
      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-8 text-center sm:pt-20">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E85D3D]/10 px-3 py-1 text-xs font-semibold text-[#E85D3D]">
          <Flame width={14} height={14} />
          Trending now
        </span>
        <h1 className="mt-4 text-3xl font-bold text-[#2B2420] sm:text-4xl">
          Popular Recipes
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[#6B6155]">
          The most loved and liked recipes by the Recipely community right
          now.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        {/* Top 3 spotlight */}
        {topThree.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {topThree.map((recipe, index) => {
              const id = recipe._id ?? recipe.id;
              return (
                <div
                  key={id}
                  className="group relative overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#FBF1E6]">
                    {recipe.recipeImage ? (
                      <Image
                        src={recipe.recipeImage}
                        alt={recipe.recipeName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                    <span
                      className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-sm ${RANK_STYLES[index]}`}
                    >
                      {index + 1}
                    </span>

                    {recipe.likes != null && (
                      <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#2B2420] backdrop-blur-sm">
                        <Heart width={12} height={12} className="fill-[#E85D3D] text-[#E85D3D]" />
                        {recipe.likes}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="truncate text-sm font-semibold text-[#2B2420]">
                      {recipe.recipeName}
                    </h3>
                    <p className="mt-1 text-xs text-[#9C9388]">
                      {recipe.cuisineType ?? recipe.category}
                    </p>
                    <a
                      href={`/all-recipes/${id}`}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#E85D3D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rest of the list */}
        {rest.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-[#2B2420]">
                More to explore
              </h2>
              <span className="h-px flex-1 bg-[#EAE0D3]" />
              <span className="text-xs text-[#9C9388]">
                {rest.length} more recipe{rest.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rest.map((recipe) => (
                <NormalRecipes key={recipe._id ?? recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularRecipePage;