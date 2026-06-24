import { serverMutation } from "../core/server"

export const addRecipe = (recipe) => {
    return serverMutation('/api/recipes', recipe)
}
export const updateRecipe = (recipeId, recipe) => {
    return serverMutation(`/api/my-recipe/${recipeId}`, recipe, 'PATCH')
}
export const deleteRecipe = (recipeId) => {
    return serverMutation(`/api/my-recipe/${recipeId}`, null, 'DELETE')
}   
export const likeRecipe = async (recipeId ,userId) => {
    return serverMutation(`/api/my-recipe/${recipeId}/like?userId=${userId}`, null, 'PATCH')
}
export const unlikeRecipe = (recipeId, userId) => {
    return serverMutation(`/api/my-recipe/${recipeId}/dislike?userId=${userId}`, null, 'PATCH')
}
export const reportRecipe = (report) => {
    return serverMutation('/api/report', report)
}