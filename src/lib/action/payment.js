import { serverMutation } from "../core/server"

export const postPayment = async (payment) => {
    return serverMutation('/api/transactions', payment)
}