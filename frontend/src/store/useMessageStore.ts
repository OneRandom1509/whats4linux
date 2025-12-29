import { create } from "zustand"

interface MessageStore {
  messages: Record<string, any[]>
  setMessages: (chatId: string, messages: any[]) => void
  addMessage: (chatId: string, message: any) => void
  clearMessages: (chatId: string) => void
}

export const useMessageStore = create<MessageStore>(set => ({
  messages: {},

  setMessages: (chatId, messages) =>
    set(state => ({
      messages: { ...state.messages, [chatId]: messages },
    })),

  addMessage: (chatId, message) =>
    set(state => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),

  clearMessages: chatId =>
    set(state => {
      const newMessages = { ...state.messages }
      delete newMessages[chatId]
      return { messages: newMessages }
    }),
}))
