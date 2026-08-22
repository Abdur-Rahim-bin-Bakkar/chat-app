import { create } from 'zustand';
import { User, Conversation, Message, api } from '@/services/api';

interface ChatState {
  currentUser: User | null;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (phone: string, name: string) => Promise<void>;
  logout: () => void;
  loadConversations: () => Promise<void>;
  setActiveConversation: (conversation: Conversation) => void;
  loadMessages: (conversationId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  createConversation: (participantIds: string[], isGroup: boolean, name?: string) => Promise<Conversation | undefined>;
  
  // Real-time mock simulator
  receiveMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentUser: null,
  conversations: [],
  activeConversation: null,
  messages: [],
  isLoading: false,
  error: null,

  login: async (phone: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = await api.auth.login(phone, name);
      set({ currentUser: user, isLoading: false });
      get().loadConversations();
    } catch (error: any) {
      set({ error: error.message || 'Failed to login', isLoading: false });
    }
  },

  logout: () => {
    set({ currentUser: null, conversations: [], activeConversation: null, messages: [] });
  },

  loadConversations: async () => {
    const { currentUser } = get();
    if (!currentUser) return;
    
    try {
      const { conversations } = await api.conversations.list(currentUser.id);
      set({ conversations });
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  },

  setActiveConversation: (conversation: Conversation) => {
    set({ activeConversation: conversation, messages: [] });
    get().loadMessages(conversation.id);
  },

  loadMessages: async (conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { messages } = await api.messages.list(conversationId);
      set({ messages, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load messages', isLoading: false });
    }
  },

  sendMessage: async (content: string) => {
    const { activeConversation, currentUser } = get();
    if (!activeConversation || !currentUser || !content.trim()) return;

    try {
      const newMessage = await api.messages.send(activeConversation.id, currentUser.id, content);
      
      // Update local state immediately for fast UI
      set((state) => {
        // Also update the last message in the conversations list
        const updatedConversations = state.conversations.map(c => 
          c.id === activeConversation.id ? { ...c, lastMessage: newMessage } : c
        );

        return {
          messages: [...state.messages, newMessage],
          conversations: updatedConversations
        };
      });

      // Simulate the other user replying (mock real-time behavior)
      const otherParticipants = activeConversation.participants.filter(p => p.id !== currentUser.id);
      if (otherParticipants.length > 0) {
        setTimeout(() => {
          const randomParticipant = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
          const replies = ["Got it!", "Thanks for letting me know.", "I agree.", "Sounds good.", "Interesting..."];
          const randomReply = replies[Math.floor(Math.random() * replies.length)];
          
          api.messages.send(activeConversation.id, randomParticipant.id, randomReply).then(replyMsg => {
            get().receiveMessage(replyMsg);
          });
        }, 1500 + Math.random() * 2000); // random delay 1.5 - 3.5s
      }

    } catch (error: any) {
      console.error('Failed to send message:', error);
    }
  },

  createConversation: async (participantIds: string[], isGroup: boolean, name?: string) => {
    try {
      const newConv = await api.conversations.create(participantIds, isGroup, name);
      set(state => ({
        conversations: [...state.conversations.filter(c => c.id !== newConv.id), newConv]
      }));
      get().setActiveConversation(newConv);
      return newConv;
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  },

  receiveMessage: (message: Message) => {
    const { activeConversation } = get();
    set((state) => {
      // Update conversations list with new last message
      const updatedConversations = state.conversations.map(c => 
        c.id === message.conversationId 
          ? { 
              ...c, 
              lastMessage: message,
              unreadCount: activeConversation?.id === message.conversationId ? c.unreadCount : c.unreadCount + 1
            } 
          : c
      );

      // If the message belongs to the active conversation, add it to the messages list
      if (activeConversation?.id === message.conversationId) {
        return {
          messages: [...state.messages, message],
          conversations: updatedConversations
        };
      }

      return { conversations: updatedConversations };
    });
  }
}));
