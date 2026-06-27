import { headers } from "next/headers";
import { auth } from "../auth";
import { protectedFetch, serverFetch } from "../core/server"

export async function getAllUsers() {
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    const fullToken = `Bearer ${token}`
    return await protectedFetch("/api/users/all",fullToken);
}