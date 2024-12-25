import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  setIsOpen: () => void;
}
const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useModalStore;
