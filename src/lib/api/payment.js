import { serverFetch } from "../core/server";

export const getPaymentByUserId = async (userId) => {
    return await serverFetch(`/api/transactions/${userId}`);
}
