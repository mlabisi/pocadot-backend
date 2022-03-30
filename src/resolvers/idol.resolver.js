module.exports = {
  Idol: {
    id: (idol) => idol.id,
    stageName: (idol) => idol.stageName,
    group: (idol, args, context) =>
      context.prisma.idols
        .findUnique({
          where: {
            id: idol.id
          },
          select: {
            groups: true,
          }
        }),
  },
  Query: {
    idols: (root, args, context) => context.prisma.idols.findMany(),
  },
};
