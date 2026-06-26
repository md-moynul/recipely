import { serverMutation } from "../core/server";

export const dismissReport = async (reportId) => {
    return await serverMutation(`/api/reports/${reportId}/dismiss`, null,'DELETE');
};