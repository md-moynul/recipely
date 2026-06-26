import { serverFetch} from "../core/server";

export const getReports = async () => {
    return await serverFetch("/api/reports");
};