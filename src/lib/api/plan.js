import { serverFetch } from "../core/server";

export const getPlansByIsPremium = async (isPremium) => {
  return await serverFetch(`/api/plan?isPremium=${isPremium}`);
};
export const getAllPlans = async () => {
  return await serverFetch('/api/plans/all');
};