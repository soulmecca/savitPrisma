import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return prisma.$exists.user({
        AND: [{ id: user.id }, { followers_some: { id: parentId } }],
      });

      // return exits ? true : false;
    },
    isMe: (parent, _, { request }) => {
      const { user } = request;
      return parent.id === user.id;
    },
  },
};
