import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async(_, args, { request }) => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const excistingLike = await prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            });

            try {
                if (excistingLike) {
                    // todo 
                } else {
                    const newLike = await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    })
                }
                return true;                
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
}
