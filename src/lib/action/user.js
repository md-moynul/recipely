import { serverFetch, serverMutation } from "../core/server";

export const userStatusToggle = async (userId, status) => {
    return serverMutation(`/api/users/status?userId=${userId}&status=${status}`, null, 'PATCH');
};
export const getPremiumUsers = async () => {
    return await serverFetch("/api/users/premium");
};
