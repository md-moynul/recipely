import { Label, ProgressBar } from "@heroui/react";

export default function RecipeLimitBar({ used, limit }) {
  const isUnlimited = limit === null || limit === undefined;
  const percent = isUnlimited ? 0 : Math.min((used / limit) * 100, 100);
  const isAtLimit = !isUnlimited && used >= limit;

  return (
    <div className="rounded-2xl border border-[#EAE0D3] bg-[#FBF1E6]/50 p-4 dark:border-[#3A332A] dark:bg-[#1A1714]/40">
      <ProgressBar
        aria-label="Recipes used this month"
        className="w-full"
        value={isUnlimited ? 100 : percent}
      >
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
            Monthly recipe Limit used
          </Label>
          <span
            className={`text-sm font-medium ${
              isAtLimit ? "text-[#D64545]" : "text-[#6B6155] dark:text-[#B8AFA2]"
            }`}
          >
            {isUnlimited ? `${used} added · Unlimited` : `${used} / ${limit} used`}
          </span>
        </div>

        <ProgressBar.Track className="h-2 rounded-full bg-[#EAE0D3] dark:bg-[#3A332A]">
          <ProgressBar.Fill
            className={`h-2 rounded-full ${
              isAtLimit ? "bg-[#D64545]" : "bg-[#E85D3D]"
            }`}
          />
        </ProgressBar.Track>
      </ProgressBar>

      {isAtLimit ? (
        <p className="mt-3 text-sm text-[#D64545]">
          You&apos;ve used all {limit} recipe slots this month. Upgrade to
          Premium for unlimited uploads.
        </p>
      ) : null}
    </div>
  );
}