import Link from "next/link";
import { Button } from "@heroui/react";
import { CreditCard } from "@gravity-ui/icons";

export default function RecipeLimitReached({ limit }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="rounded-2xl border border-[#F4A340]/40 bg-white p-8 text-center dark:bg-[#252019]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4E0] dark:bg-[#3A2E14]">
          <CreditCard width={22} height={22} className="text-[#B5781F]" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          You&apos;ve reached your monthly limit
        </h2>
        <p className="mt-1.5 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
          Free accounts can add up to {limit} recipes per month. Upgrade to
          Premium to publish unlimited recipes anytime.
        </p>

        <Link href="/dashboard/user/premium">
          <Button className="mt-6 rounded-xl bg-[#E85D3D] px-6 text-sm font-medium text-white hover:bg-[#D14E30]">
            Upgrade to Premium
          </Button>
        </Link>
      </div>
    </div>
  );
}