"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Table } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { removeFavorite } from "@/lib/action/recipe";
import { authClient } from "@/lib/auth-client";

export default function FavoritesTable({ favorites }) {
  const router = useRouter();
  const [removingId, setRemovingId] = useState(null);
  const {
    data: session,
    isPending,
  } = authClient.useSession();
  const user = session?.user;
  const handleRemoveFavorite = async (favoriteId) => {
    setRemovingId(favoriteId);
    try {
      
      const result = await removeFavorite(favoriteId, user?.id);
      console.log(result)
      if (result?.deletedCount) {
        toast.success("Removed from favorites");
        router.refresh();
      } else {
        toast.error("Could not remove this favorite. Please try again.");
      }
    } catch (err) {
      console.error("removeFavorite error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-[#EAE0D3] p-12 text-center dark:border-[#3A332A]">
        <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
          You haven&apos;t saved any recipes yet
        </p>
        <p className="mt-1 text-sm text-[#9C9388]">
          Browse recipes and tap the bookmark icon to save them here.
        </p>
        <Link
          href="/all-recipes"
          className="mt-5 inline-block rounded-xl bg-[#E85D3D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-[#EAE0D3] dark:border-[#3A332A]">
      <Table aria-label="My favorites" className="bg-white dark:bg-[#252019]">
        <Table.ScrollContainer>
          <Table.Content aria-label="My favorites table">
            <Table.Header>
              <Table.Column isRowHeader>Recipe</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Cuisine</Table.Column>
              <Table.Column>Added On</Table.Column>
              <Table.Column align="end">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {favorites.map((favorite) => {
                const favoriteId = favorite._id ?? favorite.id;
                const recipe = favorite.recipe ?? {};
                const recipeId = favorite?.recipeId;
                const isRemoving = removingId === favoriteId;

                return (
                  <Table.Row key={favoriteId}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#FBF1E6] dark:bg-[#1A1714]">
                          {recipe.recipeImage ? (
                            <Image
                              src={recipe.recipeImage}
                              alt={recipe.recipeName}
                              fill
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <span className="truncate text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                          {recipe.recipeName ?? "Untitled recipe"}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                        {recipe.category ?? "—"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                        {recipe.cuisineType ?? "—"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                        {favorite.addedAt
                          ? new Date(favorite.addedAt).toLocaleDateString(undefined, {
                            dateStyle: "medium",
                          })
                          : "—"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveFavorite(recipe?._id)}
                          disabled={isRemoving}
                          aria-label="Remove from favorites"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#9C9388] transition-colors hover:bg-[#FBF1E6] hover:text-[#D64545] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-[#1A1714]"
                        >
                          <TrashBin width={15} height={15} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}