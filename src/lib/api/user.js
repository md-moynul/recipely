import {  protectedFetch } from "../core/server"
import { getServerToken } from "../core/server-token";

export async function getAllUsers() {
    const token = await getServerToken();
    return await protectedFetch("/api/users/all",token);
}
export const getPremiumUsers = async () => {
    const token = await getServerToken();
    return await protectedFetch("/api/users/premium",token);
};
export const getUserById = async (id) => {
    const token = await getServerToken();
    return await protectedFetch(`/api/user/${id}`,token);
};