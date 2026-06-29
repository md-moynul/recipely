import OverviewBarChart from "@/components/dashboard/OverviewBarChart";
import { getAllRecipes, getAllRecipesUseAdmin } from "@/lib/api/recipe";
import { getReports } from "@/lib/api/report";
import { getAllUsers, getPremiumUsers } from "@/lib/api/user";
import { Person, Book, CreditCard, Flag } from "@gravity-ui/icons";


function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-2xl border border-[#EAE0D3] bg-white p-5 dark:border-[#3A332A] dark:bg-[#252019]">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.bg}`}
      >
        <Icon width={18} height={18} className={accent.text} />
      </div>

      <p className="mt-4 text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
        {value ?? 0}
      </p>
      <p className="mt-1 text-sm text-[#9C9388]">{label}</p>
    </div>
  );
}

const AdminPage = async () => {
  const users = await getAllUsers();
  const recipes = await getAllRecipesUseAdmin();
  const reports = await getReports();
  const premiumUsers = await getPremiumUsers();

  const cards = [
    {
      icon: Person,
      label: "Total Users",
      value: users?.length,
      accent: { bg: "bg-[#E85D3D]/10", text: "text-[#E85D3D]" },
    },
    {
      icon: Book,
      label: "Total Recipes",
      value: recipes?.length,
      accent: { bg: "bg-[#E85D3D]/10", text: "text-[#E85D3D]" },
    },
    {
      icon: CreditCard,
      label: "Total Premium Members",
      value: premiumUsers?.length,
      accent: { bg: "bg-[#E85D3D]/10", text: "text-[#E85D3D]" },
    },
    {
      icon: Flag,
      label: "Total Reports",
      value: reports?.length,
      accent: { bg: "bg-[#E85D3D]/10", text: "text-[#E85D3D]" },
    },
  ];

  // Reshape the same numbers into chart-friendly rows
  const chartData = cards.map((c) => ({
    label: c.label.replace("Total ", ""),
    value: c.value ?? 0,
  }));

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          Overview
        </h1>
        <p className="mt-1 text-sm text-[#9C9388]">
          A snapshot of what&apos;s happening on Recipely.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <OverviewBarChart data={chartData} />
    </div>
  );
};

export default AdminPage;