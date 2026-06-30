import { initialConversations } from '../data/messages.js';
import { readStorage, writeStorage } from './storageService.js';

function getKey(userId) {
  return `zyclos_conversations_${userId || 'visitante'}`;
}

function currentTime() {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

export const chatService = {
  getConversations(userId) {
    const saved = readStorage(getKey(userId), null);
    if (saved) {
      return saved;
    }

    writeStorage(getKey(userId), initialConversations);
    return initialConversations;
  },

  saveConversations(userId, conversations) {
    writeStorage(getKey(userId), conversations);
  },

  startConversation(product, userId) {
    const conversations = this.getConversations(userId);
    const existing = conversations.find((conversation) => conversation.productId === product.id);

    if (existing) {
      return { conversations, activeConversation: existing };
    }

    const newConversation = {
      id: `c-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      sellerName: product.seller.name,
      sellerAvatar: product.seller.avatar,
      messages: [
        {
          id: `m-${Date.now()}`,
          author: 'seller',
          text: `Oi! A peca "${product.name}" ainda esta disponivel.`,
          time: currentTime(),
        },
      ],
    };

    const nextConversations = [newConversation, ...conversations];
    this.saveConversations(userId, nextConversations);
    return { conversations: nextConversations, activeConversation: newConversation };
  },

  sendMessage(userId, conversationId, text) {
    const conversations = this.getConversations(userId);
    const nextConversations = conversations.map((conversation) => {
      if (conversation.id !== conversationId) {
        return conversation;
      }

      return {
        ...conversation,
        messages: [
          ...conversation.messages,
          {
            id: `m-${Date.now()}`,
            author: 'me',
            text,
            time: currentTime(),
          },
        ],
      };
    });

    this.saveConversations(userId, nextConversations);
    return nextConversations;
  },
};
