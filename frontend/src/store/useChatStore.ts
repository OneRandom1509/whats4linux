import { create } from "zustand"
import type { ChatItem } from "./types"

interface ChatStore {
  chats: ChatItem[]
  selectedChatId: string | null
  selectedChatName: string
  selectedChatAvatar?: string
  searchTerm: string
  setChats: (chats: ChatItem[]) => void
  selectChat: (chat: ChatItem | null) => void
  setSearchTerm: (term: string) => void
  updateChatLastMessage: (chatId: string, message: string, timestamp?: number) => void
  incrementUnreadCount: (chatId: string) => void
  clearUnreadCount: (chatId: string) => void
}

export const useChatStore = create<ChatStore>(set => ({
  chats: [],
  selectedChatId: null,
  selectedChatName: "",
  selectedChatAvatar: undefined,
  searchTerm: "",

  setChats: chats => set({ chats }),

  selectChat: chat =>
    set({
      selectedChatId: chat?.id || null,
      selectedChatName: chat?.name || "",
      selectedChatAvatar: chat?.avatar,
    }),

  setSearchTerm: term => set({ searchTerm: term }),

  updateChatLastMessage: (chatId, message, timestamp) =>
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId
          ? { ...chat, subtitle: message, timestamp: timestamp || Date.now() }
          : chat,
      ),
    })),

  incrementUnreadCount: chatId =>
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId ? { ...chat, unreadCount: (chat.unreadCount || 0) + 1 } : chat,
      ),
    })),

  clearUnreadCount: chatId =>
    set(state => ({
      chats: state.chats.map(chat => (chat.id === chatId ? { ...chat, unreadCount: 0 } : chat)),
    })),
}))
