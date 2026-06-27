import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";


export const getServerSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.user || null;
}
export const requireRole = async (role) => {
    const user =await getServerSession();
    if (!user) {
        redirect("/auth/register");
    }
    if (user.role !== role) {
        redirect("/unauthorized");
    }
    return false;
}