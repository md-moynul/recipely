import { authClient } from "../auth-client";
import { protectedMutation, serverFetch, serverMutation } from "../core/server";
import { getServerToken } from "../core/server-token";

export const userStatusToggle = async (userId, status) => {
    const {data} = await authClient.token()
     const token = `Bearer ${data.token}`
    return protectedMutation(`/api/users/status?userId=${userId}&status=${status}`, null,token, 'PATCH')
};
export const changeIsPremium = async (userId, isPremium) => {
    const token = await getServerToken()
    console.log(token)
    return protectedMutation(`/api/users/premium/${userId}?isPremium=${isPremium}`, null,token, 'PATCH');
};

