export default function AllRecipesLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-10">
      {/* Header Skeleton */}
      <div className="mb-8 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <div className="h-8 w-44 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
          <div className="mt-2 h-4 w-72 rounded-lg bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
        </div>
        <div className="h-6 w-20 rounded-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#EAE0D3] bg-white p-4 dark:border-[#3A332A] dark:bg-[#252019]">
        <div className="h-10 min-w-[200px] flex-1 rounded-xl bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
        <div className="flex gap-2">
          <div className="h-10 w-28 rounded-xl bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
          <div className="h-10 w-28 rounded-xl bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
        </div>
      </div>

      {/* Recipes Grid Skeleton */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white dark:border-[#3A332A] dark:bg-[#252019]"
          >
            <div className="h-48 w-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-5 w-3/4 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                <div className="h-5 w-12 rounded-lg bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
                <div className="h-4 w-28 rounded-md bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
              </div>
              <div className="h-10 w-full rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
