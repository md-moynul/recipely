"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Table, Button } from "@heroui/react";
import { Eye, Pencil, StarFill } from "@gravity-ui/icons";
import { toast } from "react-toastify";

import DeleteRecipeDialog from "@/components/dashboard/DeleteRecipeDialog";
import { featureRecipe } from "@/lib/action/recipe";

const STATUS_STYLES = {
    published:
        "bg-[#E6F4EA] text-[#1E7B3C] dark:bg-[#1E3B2A] dark:text-[#6FCF8E]",
    pending:
        "bg-[#FFF4E0] text-[#B5870A] dark:bg-[#3A2E14] dark:text-[#E8C468]",
    rejected:
        "bg-[#FBE7E6] text-[#C0392B] dark:bg-[#3A1E1C] dark:text-[#E8847A]",
    draft:
        "bg-[#F2EDE4] text-[#6B6155] dark:bg-[#2A251E] dark:text-[#9C9388]",
};

function StatusBadge({ status }) {
    const styles = STATUS_STYLES[status] ?? STATUS_STYLES.draft;

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles}`}
        >
            {status ?? "draft"}
        </span>
    );
}

export default function ManageRecipesTable({ recipes }) {
    const router = useRouter();

    const handleFeature = async (recipeId, currentStatus) => {
        try {
            const result = await featureRecipe(recipeId, !currentStatus);
            if (result?.modifiedCount) {
                toast.success(
                    currentStatus
                        ? "Recipe removed from featured"
                        : "Recipe added to featured"
                );

                router.refresh();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update featured status");
        }
    };

    if (!recipes || recipes.length === 0) {
        return (
            <div className="mt-10 rounded-2xl border border-dashed border-[#EAE0D3] p-12 text-center dark:border-[#3A332A]">
                <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                    No recipes found
                </p>
                <p className="mt-1 text-sm text-[#9C9388]">
                    Recipes submitted by users will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#EAE0D3] shadow-sm dark:border-[#3A332A]">
            <Table
                aria-label="Manage recipes table"
                className="bg-white dark:bg-[#252019]"
            >
                <Table.ScrollContainer>
                    <Table.Content>
                        <Table.Header className="bg-[#FBF8F3] dark:bg-[#1F1B16]">
                            <Table.Column
                                isRowHeader
                                className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]"
                            >
                                Recipe
                            </Table.Column>

                            <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                                Author
                            </Table.Column>

                            <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                                Category
                            </Table.Column>

                            <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                                Cuisine
                            </Table.Column>

                            <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                                Likes
                            </Table.Column>

                            <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                                Status
                            </Table.Column>

                            <Table.Column className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                                Featured
                            </Table.Column>

                            <Table.Column
                                align="end"
                                className="text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]"
                            >
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {recipes.map((recipe) => {
                                const id = String(recipe._id ?? recipe.id);

                                return (
                                    <Table.Row
                                        key={id}
                                        className="group border-b border-[#EAE0D3]/60 transition-colors last:border-0 hover:bg-[#FBF1E6]/60 dark:border-[#3A332A]/60 dark:hover:bg-[#1A1714]/60"
                                    >
                                        <Table.Cell>
                                            <div className="flex items-center gap-3 py-1">
                                                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#FBF1E6] ring-1 ring-[#EAE0D3] dark:bg-[#1A1714] dark:ring-[#3A332A]">
                                                    {recipe.recipeImage ? (
                                                        <Image
                                                            src={recipe.recipeImage}
                                                            alt={recipe.recipeName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-[#C9BFAF]">
                                                            <Eye width={14} height={14} />
                                                        </div>
                                                    )}
                                                </div>

                                                <span className="max-w-55 truncate text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                                                    {recipe.recipeName}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                                                {recipe.authorName}
                                            </span>
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
                                                {recipe.likes || 0}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <StatusBadge status={recipe.status} />
                                        </Table.Cell>

                                        <Table.Cell>
                                            {recipe.isFeatured ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF4E0] px-2.5 py-0.5 text-xs font-medium text-[#B5870A] dark:bg-[#3A2E14] dark:text-[#E8C468]">
                                                    <StarFill width={12} height={12} />
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="bg-green-100 text-green-400 rounded-full px-2.5 py-0.5 text-xs font-medium">
                                                    Regular
                                                </span>
                                            )}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className={`flex items-center justify-end gap-1 rounded-lg border border-transparent p-0.5 transition-colors group-hover:border-[#EAE0D3] dark:group-hover:border-[#3A332A] $`}>
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    className={`${recipe.isFeatured ? "bg-yellow-50" : "bg-green-50 text-green-400"} rounded-full`}
                                                    onPress={() =>
                                                        handleFeature(recipe._id, recipe.isFeatured)
                                                    }
                                                >
                                                    {recipe.isFeatured ? "Unfeature" : "Feature"}
                                                </Button>
                                                <Link
                                                    href={`/dashboard/admin/manage-recipes/${id}`}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B6155] transition-colors hover:bg-[#FBF1E6] hover:text-[#2B2420] dark:text-[#B8AFA2] dark:hover:bg-[#1A1714] dark:hover:text-[#F4EDE4]"
                                                >
                                                    <Pencil width={15} height={15} />
                                                </Link>

                                                <DeleteRecipeDialog
                                                    recipeId={recipe._id}
                                                    recipeName={recipe.recipeName}
                                                />
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