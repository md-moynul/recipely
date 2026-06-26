import React from "react";
import AddRecipePage from "./AddRecipePage";
import { getServerSession } from "@/lib/core/session";
import { getPlansByIsPremium } from "@/lib/api/plan";
import RecipeLimitBar from "./RecipeLimitBar";
import RecipeLimitReached from "./RecipeLimitReached";
import { getRecipeThisMonth } from "@/lib/api/recipe";
// TODO: replace dummy count with a real API call, e.g.
// import { getRecipeCountThisMonth } from "@/lib/api/recipe";

const page = async () => {
  const user = await getServerSession();
  const plan = await getPlansByIsPremium(user.isPremium);
  const thisMonthRecipe = await getRecipeThisMonth(user.id);
  console.log(thisMonthRecipe);
  // TODO: call your real API here instead of this dummy number
  const usedCount = thisMonthRecipe.length;

  const limit = plan?.recipeLimit ?? null; // null = unlimited (premium)
  const isAtLimit = limit !== null && usedCount >= limit;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-10">
      <RecipeLimitBar used={usedCount} limit={limit} />

      {isAtLimit ? (
        <RecipeLimitReached limit={limit} />
      ) : (
        <AddRecipePage user={user} />
      )}
    </div>
  );
};
export default page;