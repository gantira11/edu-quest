import { create } from "zustand"

interface SidebarStore {
  open: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarStore>()((set) => ({
  open: false,
  toggleSidebar: () => set((state) => ({ open: !state.open }))
}))