import { protectedMutation, serverMutation } from "../core/server"
import { getClientToken } from "../core/token"

export const addRecipe = async (recipe) => {
    const token = await getClientToken()
    return protectedMutation('/api/recipes', recipe, token)
}
export const updateRecipe = async (recipeId, recipe) => {
    const token = await getClientToken()
    return protectedMutation(`/api/my-recipe/${recipeId}`, recipe, token, 'PATCH')
}
export const deleteRecipe = async (recipeId) => {
    const token = await getClientToken()
    return protectedMutation(`/api/my-recipe/${recipeId}`, null, token, 'DELETE')
}
export const likeRecipe = async (recipeId, userId) => {
    const token = await getClientToken()
    return protectedMutation(`/api/my-recipe/${recipeId}/like?userId=${userId}`, null, token, 'PATCH')
}
export const unlikeRecipe = async (recipeId, userId) => {
    const token = await getClientToken()
    return protectedMutation(`/api/my-recipe/${recipeId}/dislike?userId=${userId}`, null,token, 'PATCH')
}
export const reportRecipe = async (report) => {
    const token = await getClientToken()
    return protectedMutation('/api/report', report,token)
}
export const addFavorite = async (recipeData) => {
    const token = await getClientToken()
    return protectedMutation('/api/favorite', recipeData, token)
}
export const removeFavorite = async (recipeId, userId) => {
    const token = await getClientToken()
    return protectedMutation(`/api/favorite/${recipeId}/${userId}`, null,token, 'DELETE')
}
export const featureRecipe = async (recipeId, isFeatured) => {
    const token = await getClientToken()
    return protectedMutation(`/api/featured/${recipeId}?isFeatured=${isFeatured}`, null, token, 'PATCH')
}