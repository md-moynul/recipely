import Image from "next/image";
import Link from "next/link";
import { Clock, GraduationCap, HeartFill, SealCheck } from "@gravity-ui/icons";

export default function NormalRecipes({ recipe }) {
  const id = recipe._id ?? recipe.id;

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white transition-all duration-300 hover:shadow-xl dark:border-[#3A332A] dark:bg-[#252019]">
      <div className="relative h-48 w-full overflow-hidden bg-[#FBF1E6] dark:bg-[#1A1714]">
        {recipe.recipeImage ? (
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#C9BFAF]">
            <GraduationCap width={40} height={40} />
          </div>
        )}

        {/* Category Badge */}
        {recipe.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#2B2420] shadow-sm backdrop-blur-sm dark:bg-[#252019]/95 dark:text-[#F4EDE4]">
            {recipe.category}
          </span>
        )}

        {/* Featured Badge */}
        {recipe.isFeatured && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-linear-to-r from-amber-500 to-yellow-600 px-3 py-1 text-xs font-semibold text-white shadow-lg ring-1 ring-white/30">
            <SealCheck width={16} height={16} className="drop-shadow-sm" />
            <span>Featured</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 line-clamp-1 text-base font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            {recipe.recipeName}
          </h3>

        
          {recipe.price && (
            <div className="shrink-0 rounded-xl bg-[#E85D3D] px-3 py-1 text-sm font-bold text-white shadow-sm">
              ${recipe.price}
            </div>
          )}
        </div>

        {recipe.authorName && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative h-6 w-6 overflow-hidden rounded-full bg-[#FBF1E6] dark:bg-[#1A1714] ring-1 ring-white dark:ring-[#3A332A]">
                {recipe.authorImage ? (
                  <Image
                    src={recipe.authorImage}
                    alt={recipe.authorName}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                {recipe.authorName}
              </span>
            </div>

            {typeof recipe.likes === "number" && (
              <div className="flex items-center gap-1 text-[#E85D3D]">
                <HeartFill width={18} height={18} />
                <span className="text-sm font-medium">{recipe.likes}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-4 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
          {recipe.cuisineType && <span>{recipe.cuisineType}</span>}

          {recipe.preparationTime && (
            <span className="flex items-center gap-1.5">
              <Clock width={15} height={15} />
              {recipe.preparationTime}
            </span>
          )}
        </div>

        <Link
          href={`/all-recipes/${id}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#E85D3D] py-3 text-sm font-semibold text-white transition-all hover:bg-[#D14E30] active:scale-[0.985]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}