import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        confirmSecret: async(__, args) => {
            const { email, secret } = args;
            const user = await prisma.user({ email });
            if (user.loginSecret === secret) {
                // JWC 
                return "TOKEN";
            } else {
                throw Error("Wrong email / secret");
            }
        }
    }
}
