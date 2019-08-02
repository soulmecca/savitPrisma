import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeFullPost: async (_, args) => {
            const { id } = args;
            const post = await prisma.post({ id });
            // const comments = await prisma.post({id}).comments().$fragment(COMMENT_FRAGMENT);
            // const files = await prisma.post({ id }).files();
            return post;
        },
    },
};
