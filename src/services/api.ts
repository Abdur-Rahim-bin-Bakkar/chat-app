// Real API Service Layer

const BASE_URL = 'https://frontend-task-chatapp.onrender.com/api';

export interface User {
  _id: string; // Real APIs usually use _id (MongoDB) or id. We'll support both by mapping it if needed, but let's assume `id` or `_id`. The prompt used `id` in example (`665f0c2a...`). Let's use `id` and gracefully fallback to `_id`.
  id?: string;
  name: string;
  phone: string;
}

export interface Message {
  id?: string;
  _id?: string;
  conversationId?: string;
  conversation?: string;
  senderId?: string;
  sender?: string;
  text: string; // The socket docs say { conversationId, text }
  createdAt?: string; // Standard ISO date
}

export interface Conversation {
  id?: string;
  _id?: string;
  name?: string; // Group name
  isGroup?: boolean;
  participants: User[];
  admins?: string[]; // user IDs
  lastMessage?: Message;
  unreadCount?: number;
}

// Helper to handle tokens
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('chat_token');
  }
  return null;
};

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chat_token', token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('chat_token');
  }
};

// Helper to normalize Message
const normalizeMessage = (msg: any): Message => {
  if (!msg) return msg;
  return {
    ...msg,
    conversationId: msg.conversation || msg.conversationId,
    senderId: msg.sender || msg.senderId,
  };
};

// Helper to normalize Conversation
const normalizeConversation = (conv: any): Conversation => {
  if (!conv) return conv;
  const isGroup = conv.type === 'group' || conv.isGroup;
  
  // Normalize participants so the UI can always use conv.participants array
  let normalizedParticipants = conv.participants || [];
  if (conv.type === 'direct' && conv.participant) {
    normalizedParticipants = [conv.participant];
  }
  
  return {
    ...conv,
    id: conv._id || conv.id,
    isGroup,
    participants: normalizedParticipants.map((p: any) => ({ ...p, id: p._id || p.id })),
    lastMessage: conv.lastMessage && Object.keys(conv.lastMessage).length > 0 
      ? normalizeMessage(conv.lastMessage) 
      : undefined
  };
};

// Helper for authorized fetch
async function authFetch(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const data = await response.json();
      errorMsg = data.message || errorMsg;
    } catch (e) {
      // Not JSON
      errorMsg = await response.text() || response.statusText;
    }
    throw new Error(errorMsg);
  }

  // Some endpoints might return empty body
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  auth: {
    login: async (phone: string, name: string): Promise<{ user: User; token: string }> => {
      return authFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone, name }),
      });
    },
    me: async (): Promise<User> => {
      return authFetch('/auth/me');
    }
  },
  users: {
    search: async (query: string): Promise<User[]> => {
      // Based on prompt GET /users/search
      // If the API requires query params, it might be /users/search?q=query or similar.
      return authFetch(`/users/search?q=${encodeURIComponent(query)}`);
    },
  },
  conversations: {
    list: async (): Promise<Conversation[]> => {
      const res = await authFetch('/conversations');
      const data = res.data || res || [];
      return Array.isArray(data) ? data.map(normalizeConversation) : [];
    },
    startDirect: async (userId: string): Promise<Conversation> => {
      const res = await authFetch('/conversations', {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });
      return normalizeConversation(res.data || res);
    },
    createGroup: async (participantIds: string[], name: string): Promise<Conversation> => {
      const res = await authFetch('/conversations/group', {
        method: 'POST',
        body: JSON.stringify({ participantIds, name }),
      });
      return normalizeConversation(res.data || res);
    },
    getMessages: async (conversationId: string): Promise<Message[]> => {
      const res = await authFetch(`/conversations/${conversationId}/messages`);
      const data = res.messages || res.data || res || [];
      return Array.isArray(data) ? data.map(normalizeMessage) : [];
    },
    renameGroup: async (conversationId: string, name: string): Promise<Conversation> => {
      const res = await authFetch(`/conversations/${conversationId}`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
      });
      return normalizeConversation(res.data || res);
    }
  },
  messages: {
    send: async (conversationId: string, text: string): Promise<Message> => {
      const res = await authFetch('/messages', {
        method: 'POST',
        body: JSON.stringify({ conversationId, text }),
      });
      return normalizeMessage(res.data || res);
    },
  },
};
