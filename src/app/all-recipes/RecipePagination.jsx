import { Pagination } from "@heroui/react";
import Link from "next/link";

export default function RecipePagination({ page, totalPages, paramsStr }) {
  // Windowed page numbers: show first, last, current ±1, and "…" gaps
  // instead of every page number when totalPages is large.
  console.log(page, totalPages, paramsStr);
  const sp = new URLSearchParams(paramsStr);
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

  if (totalPages <= 1) return null;

  return (
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
                      p === page
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
  );
}