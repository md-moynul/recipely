import { protectedFetch, serverFetch } from "../core/server";
import { getServerToken } from "../core/server-token";
export const getRecipeByAuthorId = async (authorId) => {
    const token = await getServerToken()
    return await protectedFetch(`/api/my-recipe?authorId=${authorId}`,token);
}
export const getRecipeByRecipeId = async (recipeId) => {
    return await serverFetch(`/api/my-recipe/${recipeId}`);
}
export const getAllRecipes = async (page) => {
    return await serverFetch(`/api/recipes?page=${page}`);
}
export const getRecipeByUserEmail = async (userEmail) => {
    const token = await getServerToken()
    return await protectedFetch(`/api/my-recipe/favorite/${userEmail}`,token);
}
export const getRecipeThisMonth = async (userId) => {
    const token = await getServerToken()
    return await protectedFetch(`/api/my-recipe/this-month?authorId=${userId}`,token);
}
export const getFeaturedRecipe = async () => {
    return await serverFetch('/api/recipes/featured');
}
export const getPopularRecipes = async () => {
    return await serverFetch('/api/recipes/popular');
}