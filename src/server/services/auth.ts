import { db } from "./db.js"

export const getUserByEmail =  async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        return user
    } catch (error) {
        console.log("User Email Funcition :",error)
        return null
    }
}