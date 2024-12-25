import { create } from "zustand";
import { User } from "../types/types";

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}
const useUserStore = create<UserStore>((set) => ({
  user: {} as User,
  setUser: (user: User) => set(() => ({ user: user })),
}));

export default useUserStore;
