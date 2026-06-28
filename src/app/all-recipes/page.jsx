import { getAllRecipes } from "@/lib/api/recipe";
import NormalRecipes from "./NormalRecipes";
import { Pagination } from "@heroui/react";
import Link from "next/link";

const AllRecipesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const paramsPage = params.page;
  const recipeData = await getAllRecipes(paramsPage);
  const recipes = recipeData?.data;
  const page = Number(recipeData?.page) || 1;
  const totalPages = recipeData?.totalPages;

  if (!recipes || recipes.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
          No recipes found yet
        </p>
        <p className="mt-1 text-sm text-[#9C9388]">
          Check back soon, or be the first to share one.
        </p>
      </div>
    );
  }

  // Windowed page numbers: show first, last, current ±1, and "…" gaps
  // instead of every page number when totalPages is large.
  const getPageNumbers = () => {
    const pages = [];
    const window = 1;

    for (let p = 1; p <= totalPages; p++) {
      const isEdge = p === 1 || p === totalPages;
      const isNearCurrent = Math.abs(p - page) <= window;

      if (isEdge || isNearCurrent) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          Browse Recipes
        </h1>
        <span className="text-sm text-[#9C9388]">
          {recipes.length} recipe{recipes.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <NormalRecipes key={recipe._id ?? recipe.id} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-center">
          <Pagination className="gap-1.5">
            <Pagination.Content className="flex items-center gap-1.5">
              <Pagination.Item>
                {page > 1 ? (
                  <Link href={`/all-recipes?page=${page - 1}`}>
                    <Pagination.Previous className="flex items-center gap-1.5 rounded-xl border border-[#EAE0D3] px-3 py-2 text-sm font-medium text-[#2B2420] transition-colors hover:bg-[#FBF1E6] dark:border-[#3A332A] dark:text-[#F4EDE4] dark:hover:bg-[#1A1714]">
                      <Pagination.PreviousIcon />
                      <span className="hidden sm:inline">Previous</span>
                    </Pagination.Previous>
                  </Link>
                ) : (
                  <Pagination.Previous
                    isDisabled
                    className="flex items-center gap-1.5 rounded-xl border border-[#EAE0D3] px-3 py-2 text-sm font-medium text-[#9C9388] opacity-50 dark:border-[#3A332A]"
                  >
                    <Pagination.PreviousIcon />
                    <span className="hidden sm:inline">Previous</span>
                  </Pagination.Previous>
                )}
              </Pagination.Item>

              {pageNumbers.map((p, i) =>
                p === "..." ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <span className="flex h-9 w-9 items-center justify-center text-sm text-[#9C9388]">
                      …
                    </span>
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Link href={`/all-recipes?page=${p}`}>
                      <Pagination.Link
                        isActive={p === page}
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                          p ===page
                            ? "bg-[#E85D3D] text-white"
                            : "text-[#6B6155] hover:bg-[#FBF1E6] dark:text-[#B8AFA2] dark:hover:bg-[#1A1714]"
                        }`}
                      >
                        {p}
                      </Pagination.Link>
                    </Link>
                  </Pagination.Item>
                )
              )}

              <Pagination.Item>
                {page < totalPages ? (
                  <Link href={`/all-recipes?page=${page + 1}`}>
                    <Pagination.Next className="flex items-center gap-1.5 rounded-xl border border-[#EAE0D3] px-3 py-2 text-sm font-medium text-[#2B2420] transition-colors hover:bg-[#FBF1E6] dark:border-[#3A332A] dark:text-[#F4EDE4] dark:hover:bg-[#1A1714]">
                      <span className="hidden sm:inline">Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Link>
                ) : (
                  <Pagination.Next
                    isDisabled
                    className="flex items-center gap-1.5 rounded-xl border border-[#EAE0D3] px-3 py-2 text-sm font-medium text-[#9C9388] opacity-50 dark:border-[#3A332A]"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                )}
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      ) : null}
    </div>
  );
};

export default AllRecipesPage;