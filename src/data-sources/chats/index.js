const { DataSource } = require('apollo-datasource');
const services = require('../../services');
module.exports.Chats = class extends DataSource {
  constructor() {
    super();
  }

  async fetchUserConversations({ userId }) {
    return services.Twilio.client.conversations.v1.participantConversations
      .list({ identity: userId, limit: 20 })
      .then((conversations) =>
        conversations.map((c) =>
          services.Twilio.client.conversations.v1
            .conversations(c.conversationSid)
            .fetch(),
        ),
      );
  }

  async createConversation({ fromId, toId, listingId }, context) {
    const existingConversations = await Promise.all(
      await new Promise((resolve) =>
        resolve(this.fetchUserConversations({ userId: fromId })),
      ),
    );
    const existingConversation = await new Promise((resolve) =>
      resolve(
        existingConversations.find(async (c) => {
          return (await Promise.all(await this.fetchParticipants(c.sid)))
            .map((p) => p.identity)
            .includes(toId);
        }),
      ),
    );

    if (existingConversation) {
      const existingIds = JSON.parse(
        existingConversation.attributes,
      ).listingIds;
      return services.Twilio.client.conversations.v1
        .conversations(existingConversation.sid)
        .update({
          attributes: JSON.stringify({
            listingIds: [...existingIds, listingId],
          }),
        });
    } else {
      return services.Twilio.client.conversations.v1.conversations
        .create({
          friendlyName: 'Friendly Chat',
          attributes: JSON.stringify({ listingIds: [listingId] }),
        })
        .then((conversation) =>
          services.Twilio.client.conversations.v1
            .conversations(conversation.sid)
            .participants.create({ identity: fromId }),
        )
        .then((participant) =>
          services.Twilio.client.conversations.v1
            .conversations(participant.conversationSid)
            .participants.create({ identity: toId })
            .then((p) =>
              services.Twilio.client.conversations.v1
                .conversations(p.conversationSid)
                .fetch(),
            ),
        );
    }
  }

  async deleteConversation({ id }, context) {
    const conversation = this.fetchConversation(id);

    return services.Twilio.client.conversations.v1
      .conversations(id)
      .remove()
      .then(() => conversation);
  }

  async fetchConversation(id) {
    return services.Twilio.client.conversations.v1
      .conversations(id)
      .fetch()
      .then((conversation) => conversation);
  }

  async fetchParticipants(conversationId) {
    return services.Twilio.client.conversations.v1
      .conversations(conversationId)
      .participants.list({ limit: 2 })
      .then((participants) => participants);
  }

  async sendMessage({ conversationId, authorId, message }, context) {
    return services.Twilio.client.conversations.v1
      .conversations(conversationId)
      .messages.create({ author: authorId, body: message })
      .then((message) =>
        services.Twilio.client.conversations.v1
          .conversations(message.conversationSid)
          .fetch(),
      );
  }

  async fetchMessages(conversationId) {
    return services.Twilio.client.conversations.v1
      .conversations(conversationId)
      .messages.list({ limit: 15 })
      .then((list) =>
        list.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)),
      );
  }
};
