import Image from "next/image";
import Link from "next/link";
import { Pencil, TrashBin } from "@gravity-ui/icons";

export default function RecipeCard({ recipe }) {
  const id = recipe._id ?? recipe.id;

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white dark:border-[#3A332A] dark:bg-[#252019]">
      <div className="relative h-44 w-full bg-[#FBF1E6] dark:bg-[#1A1714]">
        {recipe.recipeImage ? (
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#9C9388]">
            No image
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="truncate text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
          {recipe.recipeName}
        </h3>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href={`/dashboard/user/my-recipes/${id}/edit`}
            aria-label="Edit recipe"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B6155] transition-colors hover:bg-[#FBF1E6] hover:text-[#2B2420] dark:text-[#B8AFA2] dark:hover:bg-[#1A1714] dark:hover:text-[#F4EDE4]"
          >
            <Pencil width={15} height={15} />
          </Link>

          <button
            type="button"
            data-recipe-id={id}
            aria-label="Delete recipe"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9C9388] transition-colors hover:bg-[#FBF1E6] hover:text-[#D64545] dark:hover:bg-[#1A1714]"
          >
            <TrashBin width={15} height={15} />
          </button>
        </div>
      </div>
    </div>
  );
}