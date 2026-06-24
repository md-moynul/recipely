import { serverFetch } from "../core/server";

export const getRecipeByAuthorId = async (authorId) => {
    return await serverFetch(`/api/my-recipe?authorId=${authorId}`);
}
export const getRecipeByRecipeId = async (recipeId) => {
    return await serverFetch(`/api/my-recipe/${recipeId}`);
}
export const getAllRecipes = async () => {
    return await serverFetch('/api/recipes');
}
export const getFavoritesRecipeByUserIDAndRecipeId = async(recipeId,userId) =>{
    return await serverFetch(`/api/favorite?userId=${userId}&recipeId=${recipeId}`);
}