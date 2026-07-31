export default function AdminDashboardLoading() {
  return (
    <div className="animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-6 space-y-2">
        <div className="h-7 w-32 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
        <div className="h-4 w-64 rounded-lg bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
      </div>

      {/* 4 Stat Cards Skeleton — matches: icon → value → label */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#EAE0D3] bg-white p-5 dark:border-[#3A332A] dark:bg-[#252019]"
          >
            <div className="h-10 w-10 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
            <div className="mt-4 h-7 w-16 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
            <div className="mt-2 h-4 w-28 rounded-md bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
          </div>
        ))}
      </div>

      {/* Bar Chart Skeleton — matches OverviewBarChart */}
      <div className="mt-6 rounded-2xl border border-[#EAE0D3] bg-white p-5 dark:border-[#3A332A] dark:bg-[#252019]">
        {/* Chart title */}
        <div className="h-5 w-36 rounded bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
        {/* Chart area with bars */}
        <div className="mt-6 flex h-64 items-end gap-6 px-4">
          {[40, 80, 55, 65].map((pct, i) => (
            <div key={i} className="flex w-full flex-col items-center gap-3">
              <div
                className="w-full rounded-t-xl bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60"
                style={{ height: `${pct}%` }}
              />
              <div className="h-3 w-14 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
