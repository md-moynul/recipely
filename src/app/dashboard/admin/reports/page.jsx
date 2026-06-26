import { getReports } from "@/lib/api/report";
import ReportsClient from "./ReportsClient";


const ReportsPage = async () => {
  const reports = await getReports();

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          Reports
        </h1>
        <p className="mt-1 text-sm text-[#9C9388]">
          {reports?.length ?? 0} report{reports?.length === 1 ? "" : "s"} to review
        </p>
      </div>

      <ReportsClient initialReports={reports} />
    </div>
  );
};

export default ReportsPage;