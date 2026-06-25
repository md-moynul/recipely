import { serverFetch } from "../core/server"

export async function getAllUsers() {
    return await serverFetch("/api/users/all");
}