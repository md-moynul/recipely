import { authClient } from "../auth-client"
import { protectedMutation, serverMutation } from "../core/server"

export const addRecipe = async (recipe) => {
    const { data } = await authClient.token()
    const token = `Bearer ${data.token}`
    return protectedMutation('/api/recipes', recipe, token)
}
export const updateRecipe = async (recipeId, recipe) => {
    const { data } = await authClient.token()
    const token = `Bearer ${data.token}`
    return protectedMutation(`/api/my-recipe/${recipeId}`, recipe, token, 'PATCH')
}
export const deleteRecipe = async (recipeId) => {
    const { data } = await authClient.token()
    const token = `Bearer ${data.token}`
    return protectedMutation(`/api/my-recipe/${recipeId}`, null, token, 'DELETE')
}
export const likeRecipe = async (recipeId, userId) => {
    return serverMutation(`/api/my-recipe/${recipeId}/like?userId=${userId}`, null, 'PATCH')
}
export const unlikeRecipe = (recipeId, userId) => {
    return serverMutation(`/api/my-recipe/${recipeId}/dislike?userId=${userId}`, null, 'PATCH')
}
export const reportRecipe = (report) => {
    return serverMutation('/api/report', report)
}
export const addFavorite = async (recipeData) => {
    const {data} = await authClient.token()
     const token = `Bearer ${data.token}`
    return protectedMutation('/api/favorite', recipeData, token)
}
export const removeFavorite = (recipeId, userId) => {
    return serverMutation(`/api/favorite/${recipeId}/${userId}`, null, 'DELETE')
}
export const featureRecipe = (recipeId, isFeatured) => {
    console.log(recipeId, isFeatured);
    return serverMutation(`/api/featured/${recipeId}?isFeatured=${isFeatured}`, null, 'PATCH')
}