"use server";
import { headers } from "next/headers"
import { auth } from "../auth"

export const getServerToken = async () => {
    const {token} = await auth.api.getToken({
            headers: await headers()
        })
        const fullToken = `Bearer ${token}`
        return fullToken
}