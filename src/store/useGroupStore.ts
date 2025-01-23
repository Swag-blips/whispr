import { create } from "zustand";

interface GroupStore {
  isOpen: boolean;
  setIsOpen: () => void;
}

const useGroupStore = create<GroupStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set(() => ({ isOpen: true })),
}));

export default useGroupStore;
