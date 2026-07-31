export default function RecipeDetailsLoading() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl animate-pulse overflow-hidden rounded-3xl border border-[#EAE0D3] bg-white shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
        {/* Hero Image Skeleton */}
        <div className="h-80 w-full bg-[#EAE0D3]/70 sm:h-100 dark:bg-[#3A332A]/70" />

        {/* Content Body Skeleton */}
        <div className="p-6 sm:p-10">
          {/* Header Action Row Skeleton */}
          <div className="flex flex-col gap-4 border-b border-[#EAE0D3] pb-6 sm:flex-row sm:items-start sm:justify-between dark:border-[#3A332A]">
            <div className="space-y-2">
              <div className="h-4 w-36 rounded-md bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
              <div className="h-8 w-64 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-24 rounded-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
              <div className="h-10 w-24 rounded-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
            </div>
          </div>

          {/* Metrics Grid Skeleton */}
          <div className="my-6 grid grid-cols-2 gap-4 rounded-2xl bg-[#FBF1E6]/50 p-4 text-center sm:grid-cols-4 dark:bg-[#1A1714]/40">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-1">
                <div className="h-3 w-16 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                <div className="h-5 w-20 rounded bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
              </div>
            ))}
          </div>

          {/* Content & Author Skeleton */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-3">
                <div className="h-6 w-32 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                <div className="h-4 w-full rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
                <div className="h-4 w-5/6 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
                <div className="h-4 w-4/6 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
              </div>
              <div className="space-y-3 pt-4">
                <div className="h-6 w-36 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                <div className="h-4 w-full rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
                <div className="h-4 w-full rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
                <div className="h-4 w-3/4 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="flex flex-col items-center rounded-2xl border border-[#EAE0D3] bg-stone-50/50 p-5 dark:border-[#3A332A] dark:bg-[#1A1714]/20">
                <div className="h-16 w-16 rounded-full bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                <div className="mt-3 h-4 w-28 rounded bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
                <div className="mt-2 h-3 w-20 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
