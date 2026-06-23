import { serverFetch } from "../core/server";

export const getRecipes = async (authorId) => {
    return await serverFetch(`/api/my-recipe?authorId=${authorId}`);
}