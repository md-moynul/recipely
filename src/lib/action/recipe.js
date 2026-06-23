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