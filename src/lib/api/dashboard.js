import { protectedFetch } from "../core/server";
import { getServerToken } from "../core/server-token";

export const getAdminOverview = async () => {
    const token = await getServerToken();
    return await protectedFetch('/api/dashboard/admin/overview', token);
};

export const getUserOverview = async () => {
    const token = await getServerToken();
    return await protectedFetch('/api/dashboard/user/overview', token);
};
