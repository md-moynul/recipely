import { getAllReviewsAdmin } from "@/lib/api/recipe";
import ManageReviewsTable from "./ManageReviewsTable";

export const metadata = {
  title: "Manage Reviews | Admin Dashboard - Recipely",
  description: "Moderate and manage user recipe reviews and ratings across Recipely.",
};

const ManageReviewsPage = async () => {
  const result = await getAllReviewsAdmin();
  const reviews = Array.isArray(result) ? result : result?.reviews ?? [];

  return (
    <div className="mx-auto w-full container px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            Manage Reviews
          </h1>
          <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
            Monitor ratings, moderate user feedback, and maintain quality across all recipes.
          </p>
        </div>
      </div>

      <ManageReviewsTable initialReviews={reviews} />
    </div>
  );
};

export default ManageReviewsPage;
