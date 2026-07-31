export default function GlobalLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* ── Hero Section Skeleton ── */}
      <div className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden bg-[#EAE0D3]/40 dark:bg-[#1A1714]">
        {/* Dark overlay simulation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30 dark:from-black/30 dark:via-black/40 dark:to-black/50" />

        <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
          <div className="h-12 w-[320px] rounded-2xl bg-white/20 sm:w-[500px] md:h-16 md:w-[620px]" />
          <div className="h-5 w-[260px] rounded-lg bg-white/15 sm:w-[380px]" />
          <div className="mt-4 flex gap-3">
            <div className="h-12 w-40 rounded-xl bg-white/20" />
            <div className="h-12 w-36 rounded-xl bg-white/15" />
          </div>
        </div>
      </div>

      {/* ── Featured Recipes Section Skeleton ── */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="h-8 w-52 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
              <div className="mt-2 h-4 w-56 rounded-lg bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
            </div>
            <div className="hidden h-4 w-20 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60 sm:block" />
          </div>

          {/* 4 featured recipe cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white dark:border-[#3A332A] dark:bg-[#252019]"
              >
                {/* Image placeholder with badge */}
                <div className="relative h-44 w-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70">
                  <div className="absolute left-3 top-3 h-6 w-20 rounded-full bg-[#EAE0D3]/90 dark:bg-[#3A332A]" />
                </div>
                <div className="p-4">
                  <div className="h-4 w-3/4 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                  <div className="mt-2 h-3 w-1/3 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
                  <div className="mt-4 h-10 w-full rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Recipes Section Skeleton ── */}
      <section className="bg-[#FBF1E6]/30 px-4 py-16 dark:bg-[#1A1714]/30">
        <div className="mx-auto max-w-6xl">
          {/* Section header with trending badge */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="h-6 w-24 rounded-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
              <div className="mt-3 h-8 w-48 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
            </div>
            <div className="hidden h-4 w-20 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60 sm:block" />
          </div>

          {/* 4 popular recipe cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-[#EAE0D3] bg-white dark:border-[#3A332A] dark:bg-[#252019]"
              >
                {/* Image placeholder with likes badge */}
                <div className="relative h-44 w-full bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70">
                  <div className="absolute bottom-3 right-3 h-6 w-14 rounded-full bg-white/80 dark:bg-[#252019]/80" />
                </div>
                <div className="p-4">
                  <div className="h-4 w-3/4 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                  <div className="mt-2 h-3 w-1/3 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                  <div className="mt-4 h-10 w-full rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-9 w-9 rounded-lg bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section Skeleton ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Section title */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-3.5 w-24 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
            <div className="h-8 w-72 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
          </div>

          {/* 3 step cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#EAE0D3] bg-white p-6 dark:border-[#3A332A] dark:bg-[#252019]"
              >
                <div className="h-11 w-11 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                <div className="mt-4 h-5 w-24 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                <div className="mt-2 space-y-1.5">
                  <div className="h-3 w-full rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                  <div className="h-3 w-5/6 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
                </div>
              </div>
            ))}
          </div>

          {/* Why Recipely subsection */}
          <div className="mt-20 flex flex-col items-center gap-2">
            <div className="h-3.5 w-28 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
            <div className="h-8 w-80 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
          </div>

          {/* 3 reason items */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="h-11 w-11 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                <div className="mt-4 h-5 w-36 rounded-lg bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                <div className="mt-2 space-y-1.5">
                  <div className="h-3 w-48 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                  <div className="h-3 w-40 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Section Skeleton ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section title */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <div className="h-8 w-56 rounded-xl bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
            <div className="h-4 w-72 rounded-lg bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
          </div>

          {/* Marquee-like review cards row */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#FFF9F2] to-transparent dark:from-[#1A1714] sm:w-32" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#FFF9F2] to-transparent dark:from-[#1A1714] sm:w-32" />

            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-85 shrink-0 rounded-3xl border border-[#EAE0D3] bg-[#FBF1E6] p-8 dark:border-[#3A332A] dark:bg-[#252019]"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                    <div className="space-y-2">
                      <div className="h-4 w-28 rounded bg-[#EAE0D3]/80 dark:bg-[#3A332A]" />
                      <div className="h-3 w-16 rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                    </div>
                  </div>
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="h-5 w-5 rounded bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="h-3.5 w-full rounded bg-[#EAE0D3]/60 dark:bg-[#3A332A]/60" />
                    <div className="h-3.5 w-4/5 rounded bg-[#EAE0D3]/50 dark:bg-[#3A332A]/50" />
                  </div>
                  <div className="mt-4 h-3.5 w-32 rounded bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer stat */}
          <div className="mt-16 flex justify-center border-t border-[#EAE0D3] pt-8 dark:border-[#3A332A]">
            <div className="h-4 w-48 rounded bg-[#EAE0D3]/70 dark:bg-[#3A332A]/70" />
          </div>
        </div>
      </section>
    </div>
  );
}