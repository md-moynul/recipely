import { protectedFetch, serverFetch } from "../core/server";
import { getServerToken } from "../core/server-token";

export const getPaymentByUserId = async (userId) => {
    const token = await getServerToken();
    return await protectedFetch(`/api/transactions/${userId}`, token);
}
export const getAllTransactions = async () => {
    const token = await getServerToken();
    return await protectedFetch('/api/transactions', token);
}
