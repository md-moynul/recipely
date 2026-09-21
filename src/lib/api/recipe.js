import { protectedFetch, serverFetch, optionalTokenFetch } from "../core/server";
import { getServerToken } from "../core/server-token";
export const getRecipeByAuthorId = async (authorId) => {
    const token = await getServerToken()
    return await protectedFetch(`/api/my-recipe?authorId=${authorId}`,token);
}
export const getRecipeByRecipeId = async (recipeId) => {
    const token = await getServerToken();
    return await optionalTokenFetch(`/api/my-recipe/${recipeId}`, token);
}
export const getAllRecipes = async (params) => {
    return await serverFetch(`/api/recipes?${params}`);
} 
export const getAllRecipesUseAdmin = async () => {
    const token = await getServerToken()    
    return await protectedFetch(`/api/recipes/admin`,token);
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
export const getPopularRecipes = async (params) => {
    return await serverFetch(`/api/recipes/popular?${params}`);
}
export const getRecipeReviews = async (recipeId) => {
    return await serverFetch(`/api/reviews/${recipeId}`);
}
export const getAllReviewsAdmin = async () => {
    const token = await getServerToken();
    return await protectedFetch('/api/admin/reviews', token);
}
export const getMyReviews = async (authorId) => {
    const token = await getServerToken();
    const query = authorId ? `?authorId=${authorId}` : '';
    return await protectedFetch(`/api/my-reviews${query}`, token);
}