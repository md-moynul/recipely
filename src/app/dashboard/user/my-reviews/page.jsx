import Link from "next/link";
import { getMyReviews } from "@/lib/api/recipe";
import MyReviewsTable from "./MyReviewsTable";

export const metadata = {
  title: "My Reviews | User Dashboard - Recipely",
  description: "View, edit, and manage all your recipe reviews and ratings on Recipely.",
};

const MyReviewsPage = async () => {
  const result = await getMyReviews();
  const reviews = Array.isArray(result) ? result : result?.reviews ?? [];

  return (
    <div className="mx-auto w-full container px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            My Reviews
          </h1>
          <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
            Keep track of your cooking ratings, feedback, and notes for dishes you have tasted.
          </p>
        </div>
        <Link
          href="/all-recipes"
          className="inline-flex items-center justify-center rounded-xl bg-[#E85D3D] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30] shadow-sm"
        >
          Explore More Recipes
        </Link>
      </div>

      <MyReviewsTable initialReviews={reviews} />
    </div>
  );
};

export default MyReviewsPage;
