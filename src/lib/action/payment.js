import { protectedMutation, serverMutation } from "../core/server"
import { getServerToken } from "../core/server-token"

export const postPayment = async (payment) => {
    const token = await getServerToken()
    return protectedMutation('/api/transactions', payment,token)
}