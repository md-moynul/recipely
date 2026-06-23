import { serverMutation } from "../core/server"

export const addRecipe = (recipe) => {
    return serverMutation('/api/recipes', recipe)
}