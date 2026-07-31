export default function UserDashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-6 py-10">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-36 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
          <div className="h-4 w-60 rounded-lg bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
        </div>
        <div className="h-7 w-32 rounded-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
      </div>

      {/* 4 Stat Cards Skeleton */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#EAE0D3] bg-white p-5 dark:border-[#3A332A] dark:bg-[#252019]"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 rounded bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
              <div className="h-9 w-9 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
            </div>
            <div className="mt-3 h-8 w-14 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
          </div>
        ))}
      </div>

      {/* Upgrade Banner Skeleton */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#EAE0D3] bg-stone-50/50 p-5 sm:flex-row sm:items-center dark:border-[#3A332A] dark:bg-[#1A1714]/20">
        <div className="space-y-2">
          <div className="h-4 w-44 rounded bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
          <div className="h-3.5 w-72 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
      </div>
    </div>
  );
}
