import { serverMutation } from "../core/server";

export const userStatusToggle = async (userId,status) => {
    console.log("Toggling block status:", userId);
    console.log('status ' ,typeof status);
    
    return serverMutation(`/api/users/status?userId=${userId}&status=${status}`,null ,'PATCH');
};

