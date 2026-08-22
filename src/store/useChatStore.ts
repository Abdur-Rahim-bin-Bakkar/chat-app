import { create } from 'zustand';
import { User, Conversation, Message, api, setAuthToken, clearAuthToken, getAuthToken } from '@/services/api';
import { io, Socket } from 'socket.io-client';

interface ChatState {
  currentUser: User | null;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
  socket: Socket | null;

  // Actions
  initialize: () => Promise<void>;
  login: (phone: string, name: string) => Promise<void>;
  logout: () => void;
  loadConversations: () => Promise<void>;
  setActiveConversation: (conversation: Conversation) => void;
  loadMessages: (conversationId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  startDirectConversation: (userId: string) => Promise<Conversation | undefined>;
  createGroup: (userIds: string[], name: string) => Promise<Conversation | undefined>;
  
  // Socket events
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentUser: null,
  conversations: [],
  activeConversation: null,
  messages: [],
  isLoading: false,
  isInitializing: true,
  error: null,
  socket: null,

  initialize: async () => {
    const token = getAuthToken();
    if (token) {
      try {
        const user = await api.auth.me();
        set({ currentUser: user });
        get().connectSocket(token);
        await get().loadConversations();
      } catch (e) {
        clearAuthToken();
      }
    }
    set({ isInitializing: false });
  },

  login: async (phone: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await api.auth.login(phone, name);
      setAuthToken(token);
      set({ currentUser: user, isLoading: false });
      get().connectSocket(token);
      await get().loadConversations();
    } catch (error: any) {
      set({ error: error.message || 'Failed to login', isLoading: false });
    }
  },

  logout: () => {
    clearAuthToken();
    get().disconnectSocket();
    set({ currentUser: null, conversations: [], activeConversation: null, messages: [] });
  },

  connectSocket: (token: string) => {
    // Prevent multiple connections
    if (get().socket) return;

    const socket = io('https://frontend-task-chatapp.onrender.com', {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('message:new', (message: Message) => {
      const state = get();
      const msgConvId = message.conversation || message.conversationId;
      const isForActive = state.activeConversation && 
        (state.activeConversation.id === msgConvId || state.activeConversation._id === msgConvId);
      
      set((state) => ({
        messages: isForActive ? [...state.messages, message] : state.messages,
        conversations: state.conversations.map(c => 
          (c.id === msgConvId || c._id === msgConvId)
            ? { ...c, lastMessage: message, unreadCount: isForActive ? (c.unreadCount || 0) : (c.unreadCount || 0) + 1 }
            : c
        )
      }));
    });

    socket.on('conversation:updated', () => {
      // Refresh conversations when a group updates
      get().loadConversations();
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  loadConversations: async () => {
    try {
      const conversations = await api.conversations.list();
      set({ conversations });
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  },

  setActiveConversation: (conversation: Conversation) => {
    set({ activeConversation: conversation, messages: [] });
    get().loadMessages(conversation.id || conversation._id || '');
  },

  loadMessages: async (conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await api.conversations.getMessages(conversationId);
      set({ messages, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load messages', isLoading: false });
    }
  },

  sendMessage: async (content: string) => {
    const { activeConversation, currentUser } = get();
    if (!activeConversation || !currentUser || !content.trim()) return;

    const convId = activeConversation.id || activeConversation._id || '';

    try {
      // Use the REST endpoint to send
      const newMessage = await api.messages.send(convId, content);
      
      // Update local state immediately for fast UI
      set((state) => ({
        messages: [...state.messages, newMessage],
        conversations: state.conversations.map(c => 
          (c.id === convId || c._id === convId) ? { ...c, lastMessage: newMessage } : c
        )
      }));
    } catch (error: any) {
      console.error('Failed to send message:', error);
    }
  },

  startDirectConversation: async (userId: string) => {
    try {
      const newConv = await api.conversations.startDirect(userId);
      await get().loadConversations();
      // Find the newly loaded conv to set it active
      const state = get();
      const updatedConv = state.conversations.find(c => c.id === newConv.id || c._id === newConv.id || c._id === newConv._id);
      if (updatedConv) {
        get().setActiveConversation(updatedConv);
      }
      return newConv;
    } catch (error) {
      console.error('Failed to create direct conversation:', error);
    }
  },

  createGroup: async (userIds: string[], name: string) => {
    try {
      const newConv = await api.conversations.createGroup(userIds, name);
      await get().loadConversations();
      const state = get();
      const updatedConv = state.conversations.find(c => c.id === newConv.id || c._id === newConv.id || c._id === newConv._id);
      if (updatedConv) {
        get().setActiveConversation(updatedConv);
      }
      return newConv;
    } catch (error) {
      console.error('Failed to create group conversation:', error);
    }
  },
}));
