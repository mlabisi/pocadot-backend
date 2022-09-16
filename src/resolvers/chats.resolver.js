module.exports = {
  Query: {
    fetchChat: async (_, { input }, context) =>
      context.dataSources.chats.fetchConversation(input.id),
  },
  Mutation: {
    sendMessage: async (_, { input }, context) =>
      context.dataSources.chats.sendMessage(input, context),
    startChat: async (_, { input }, context) =>
      context.dataSources.chats.createConversation(input, context),
    deleteChat: async (_, { input }, context) =>
      context.dataSources.chats.deleteConversation(input, context),
  },
  Chat: {
    id: (conversation) => conversation.sid,
    timestamp: (conversation) => conversation.dateCreated.toString(),
    participants: async (conversation, __, context) => {
      return (
        await context.dataSources.chats.fetchParticipants(conversation.sid)
      ).map((p) => context.dataSources.users.getById(p.identity));
    },
    listings: async (conversation, __, context) =>
        context.dataSources.chats
          .fetchConversation(conversation.sid)
          .then((c) => {
            const ids = JSON.parse(c.attributes).listingIds
            return context.dataSources.listings.getByIds(ids)
          }),

    messages: (conversation, __, context) =>
      context.dataSources.chats.fetchMessages(conversation.sid),
  },
  Message: {
    id: (message) => message.sid,
    author: (message, __, context) =>
      context.dataSources.users.getById(message.author),
    timestamp: (message) => message.date_created,
  },
};
