import { protectedFetch, serverFetch} from "../core/server";
import { getServerToken } from "../core/server-token";

export const getReports = async () => {
    const token = await getServerToken();
    return await protectedFetch("/api/reports", token);
};