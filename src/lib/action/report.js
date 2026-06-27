import { authClient } from "../auth-client";
import { protectedMutation } from "../core/server";

export const dismissReport = async (reportId) => {
    const {data} = await authClient.token()
     const token = `Bearer ${data.token}`
    return await protectedMutation(`/api/reports/${reportId}/dismiss`, null, token, 'DELETE')
};