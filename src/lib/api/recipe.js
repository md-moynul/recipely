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
export const getRecipeByUserEmail = async (userEmail) => {
    console.log(userEmail);
    return await serverFetch(`/api/my-recipe/favorite/${userEmail}`);
}
export const getRecipeThisMonth = async (userId) => {
    return await serverFetch(`/api/my-recipe/this-month?authorId=${userId}`);
}