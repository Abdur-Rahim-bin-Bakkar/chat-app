// Mock API Service Layer

export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string | null;
  isGroup: boolean;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

// In-memory data store for the mock API
let mockUsers: User[] = [
  { id: "user-1", name: "Alice Smith", phone: "1234567890" },
  { id: "user-2", name: "Bob Jones", phone: "0987654321" },
  { id: "user-3", name: "Charlie Davis", phone: "5551234567" },
];

let mockConversations: Conversation[] = [];
let mockMessages: Record<string, Message[]> = {}; // conversationId -> messages[]

export const api = {
  auth: {
    login: async (phone: string, name: string): Promise<{ user: User; token: string }> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let user = mockUsers.find((u) => u.phone === phone);
      if (!user) {
        user = { id: `user-${Date.now()}`, name, phone };
        mockUsers.push(user);
      } else {
        // Update name if they logged in with a different one? The req says "sets their name to log in"
        user.name = name;
      }

      return {
        user,
        token: "mock-jwt-token-123",
      };
    },
  },
  users: {
    search: async (query: string): Promise<{ users: User[] }> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const q = query.toLowerCase();
      const results = mockUsers.filter(
        (u) => u.name.toLowerCase().includes(q) || u.phone.includes(q)
      );
      return { users: results };
    },
  },
  conversations: {
    list: async (userId: string): Promise<{ conversations: Conversation[] }> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const results = mockConversations.filter((c) =>
        c.participants.some((p) => p.id === userId)
      );
      return { conversations: results };
    },
    create: async (
      participantIds: string[],
      isGroup: boolean,
      name?: string
    ): Promise<Conversation> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const participants = mockUsers.filter((u) => participantIds.includes(u.id));
      
      // If 1-on-1, check if conversation already exists
      if (!isGroup && participants.length === 2) {
        const existing = mockConversations.find(
          (c) =>
            !c.isGroup &&
            c.participants.length === 2 &&
            c.participants.every((p) => participantIds.includes(p.id))
        );
        if (existing) return existing;
      }

      const newConversation: Conversation = {
        id: `conv-${Date.now()}`,
        name: isGroup ? name || "New Group" : null,
        isGroup,
        participants,
        unreadCount: 0,
      };

      mockConversations.push(newConversation);
      mockMessages[newConversation.id] = [];
      return newConversation;
    },
  },
  messages: {
    list: async (conversationId: string): Promise<{ messages: Message[] }> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { messages: mockMessages[conversationId] || [] };
    },
    send: async (
      conversationId: string,
      senderId: string,
      content: string
    ): Promise<Message> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId,
        content,
        timestamp: new Date().toISOString(),
      };
      
      if (!mockMessages[conversationId]) {
        mockMessages[conversationId] = [];
      }
      mockMessages[conversationId].push(newMessage);
      
      // Update last message in conversation
      const conv = mockConversations.find((c) => c.id === conversationId);
      if (conv) {
        conv.lastMessage = newMessage;
      }

      return newMessage;
    },
  },
};
