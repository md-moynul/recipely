import Image from "next/image";
import Link from "next/link";
import { Clock, GraduationCap } from "@gravity-ui/icons";

export default function NormalRecipes({ recipe }) {
  const id = recipe._id ?? recipe.id;

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white transition-shadow hover:shadow-md dark:border-[#3A332A] dark:bg-[#252019]">
      <div className="relative h-44 w-full overflow-hidden bg-[#FBF1E6] dark:bg-[#1A1714]">
        {recipe.recipeImage ? (
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#C9BFAF]">
            <GraduationCap width={28} height={28} />
          </div>
        )}

        {recipe.category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#2B2420] backdrop-blur-sm dark:bg-[#252019]/90 dark:text-[#F4EDE4]">
            {recipe.category}
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          {recipe.recipeName}
        </h3>

        {recipe.authorName ? (
          <div className="mt-2 flex items-center gap-2">
            <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full bg-[#FBF1E6] dark:bg-[#1A1714]">
              {recipe.authorImage ? (
                <Image
                  src={recipe.authorImage}
                  alt={recipe.authorName}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
            <span className="truncate text-xs text-[#6B6155] dark:text-[#B8AFA2]">
              {recipe.authorName}
            </span>
          </div>
        ) : null}

        <div className="mt-2 flex items-center gap-3 text-xs text-[#6B6155] dark:text-[#B8AFA2]">
          {recipe.cuisineType ? <span>{recipe.cuisineType}</span> : null}

          {recipe.preparationTime ? (
            <span className="flex items-center gap-1">
              <Clock width={13} height={13} />
              {recipe.preparationTime}
            </span>
          ) : null}
        </div>

        <Link
          href={`/all-recipes/${id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#E85D3D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}