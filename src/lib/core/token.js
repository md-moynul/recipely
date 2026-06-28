import { authClient } from "../auth-client"

export const getClientToken = async () => {
    const { data } = await authClient.token()
        const token = `Bearer ${data.token}`
        return token
}
