"use client";

import Image from "next/image";
import Link from "next/link";
import { Table } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

export default function MyRecipesTable({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
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
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-[#EAE0D3] dark:border-[#3A332A]">
      <Table aria-label="My recipes" className="bg-white dark:bg-[#252019]">
        <Table.ScrollContainer>
          <Table.Content aria-label="My recipes table">
            <Table.Header>
              <Table.Column isRowHeader>Recipe</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Cuisine</Table.Column>
              <Table.Column>Prep Time</Table.Column>
              <Table.Column align="end">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {recipes.map((recipe) => {
                const id = recipe._id ?? recipe.id;

                return (
                  <Table.Row key={id}>
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
                          {recipe.recipeName}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                        {recipe.category}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                        {recipe.cuisineType}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                        {recipe.preparationTime}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/recipes/${id}`}
                          aria-label="View recipe"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B6155] transition-colors hover:bg-[#FBF1E6] hover:text-[#2B2420] dark:text-[#B8AFA2] dark:hover:bg-[#1A1714] dark:hover:text-[#F4EDE4]"
                        >
                          <Eye width={15} height={15} />
                        </Link>

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