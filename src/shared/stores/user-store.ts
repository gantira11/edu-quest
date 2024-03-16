import Cookies from 'js-cookie';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUser } from '../utils/interfaces';

interface IAuthStore {
  user?: IUser | null;
  persistUser: (data?: IUser) => void
}

const customStorage = {
  getItem: (key: string) => {
    const value = Cookies.get(key);
    return value || null;
  },
  setItem: (key: string, value: string) => {
    Cookies.set(key, value);
  },
  removeItem: (key: string) => {
    Cookies.remove(key);
  },
};

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: null,
      persistUser: (data) => set({ user: data })
    }),
    {
      name: 'user',
      getStorage: () => customStorage,
    }
  )
)