import { create } from "zustand";
import { Chat } from "../types/types";

interface ChatStore {
  chat: Chat | undefined;
  setChat: (chat: Chat | undefined) => void;
  loading: boolean;
  setLoading: () => void;
}
const useChatStore = create<ChatStore>((set) => ({
  chat: {} as Chat,
  loading: true,
  setLoading: () => set((state) => ({ loading: !state.loading })),
  setChat: (chat: Chat | undefined) => set(() => ({ chat: chat })),
}));

export default useChatStore;
