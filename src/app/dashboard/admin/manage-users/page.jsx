import ManageUsersClient from "@/components/dashboard/ManageUsersClient";
import { getAllUsers } from "@/lib/api/user";


const ManageUserPage = async () => {
  const users = await getAllUsers();

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          Manage Users
        </h1>
        <p className="mt-1 text-sm text-[#9C9388]">
          {users?.length ?? 0} registered user{users?.length === 1 ? "" : "s"}
        </p>
      </div>

      <ManageUsersClient initialUsers={users} />
    </div>
  );
};

export default ManageUserPage;