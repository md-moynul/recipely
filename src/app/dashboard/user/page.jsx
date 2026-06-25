import {getRecipeByAuthorId, getRecipeByUserEmail } from "@/lib/api/recipe";
import { getServerSession } from "@/lib/core/session";
import { Book, Bookmark, CreditCard, Heart, Star } from "@gravity-ui/icons";
import Link from "next/link";

const userPage = async () => {
  const user = await getServerSession();
  const recipe = await getRecipeByAuthorId(user?.id);
  const favoriteRecipe = await getRecipeByUserEmail(user?.email);
  const totalRecipes = recipe?.length;
  const isPremium = user?.isPremium;
  const totalLikesReceived = recipe?.reduce((acc, curr) => acc + curr.likes, 0);
  const totalFavorites = favoriteRecipe?.length;
  const totalPurchased = 10;
  // TODO: replace with your real server action/API call, e.g.

  const cards = [
    {
      label: "Total Recipes",
      value: totalRecipes,
      icon: Book,
    },
    {
      label: "Total Favorites",
      value: totalFavorites,
      icon: Bookmark,
    },
    {
      label: "Total Likes Received",
      value: totalLikesReceived,
      icon: Heart,
    },
    {
      label: "Total Purchased",
      value: totalPurchased,
      icon: CreditCard,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            Overview
          </h1>
          <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
            A quick look at your kitchen so far.
          </p>
        </div>

        {isPremium ? (
          <span className="mt-2 inline-flex w-fit items-center gap-1.5 self-start rounded-full border border-[#F4A340]/40 bg-[#F4A340]/10 px-3 py-1.5 text-xs font-semibold text-[#B5781F] sm:mt-0">
            <Star width={14} height={14} className="fill-current" />
            Premium Member
          </span>
        ) : (
          <span className="mt-2 inline-flex w-fit items-center gap-1.5 self-start rounded-full border border-[#EAE0D3] px-3 py-1.5 text-xs font-medium text-[#6B6155] sm:mt-0 dark:border-[#3A332A] dark:text-[#B8AFA2]">
            Free Plan
          </span>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-[#EAE0D3] bg-white p-5 dark:border-[#3A332A] dark:bg-[#252019]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9C9388]">
                  {card.label}
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E85D3D]/10 text-[#E85D3D]">
                  <Icon width={18} height={18} />
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {!isPremium && (
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#F4A340]/40 bg-[#F4A340]/10 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#B5781F]">
              Unlock unlimited recipes
            </p>
            <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
              Go Premium to remove the monthly recipe limit and get a premium
              badge on your profile.
            </p>
          </div>
          <Link
            href="/dashboard/user/premium"
            className="shrink-0 rounded-xl bg-[#E85D3D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
          >
            Upgrade Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default userPage;