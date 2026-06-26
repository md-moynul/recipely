import { serverFetch } from "../core/server";

export const getPlansByIsPremium = async (isPremium) => {
  return await serverFetch(`/api/plan?isPremium=${isPremium}`);
  
};