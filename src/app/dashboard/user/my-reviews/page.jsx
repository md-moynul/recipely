import Link from "next/link";
import { getServerSession } from "@/lib/core/session";
import { getMyReviews } from "@/lib/api/recipe";
import MyReviewsTable from "./MyReviewsTable";

export const metadata = {
  title: "Recipe Reviews | Creator Dashboard - Recipely",
  description: "View customer feedback, ratings, and reviews received on your published recipes.",
};

const MyReviewsPage = async () => {
  const user = await getServerSession();
  const result = await getMyReviews(user?.id);
  const reviews = Array.isArray(result) ? result : result?.reviews ?? [];

  return (
    <div className="mx-auto w-full container px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            Recipe Reviews
          </h1>
          <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
            Customer feedback, cooking ratings, and reviews received across your recipes.
          </p>
        </div>
        <Link
          href="/dashboard/user/my-recipes"
          className="inline-flex items-center justify-center rounded-xl bg-[#E85D3D] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30] shadow-sm"
        >
          My Published Recipes
        </Link>
      </div>

      <MyReviewsTable initialReviews={reviews} />
    </div>
  );
};

export default MyReviewsPage;
