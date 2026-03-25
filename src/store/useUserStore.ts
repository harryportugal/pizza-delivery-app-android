import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  name: string
  phone: string
  email: string
  acceptsPromotions: boolean
  setName: (name: string) => void
  setPhone: (phone: string) => void
  setEmail: (email: string) => void
  setAcceptsPromotions: (accepts: boolean) => void
  resetUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      phone: '',
      email: '',
      acceptsPromotions: true,
      setName: (name) => set({ name }),
      setPhone: (phone) => set({ phone }),
      setEmail: (email) => set({ email }),
      setAcceptsPromotions: (acceptsPromotions) => set({ acceptsPromotions }),
      resetUser: () => set({ name: '', phone: '', email: '', acceptsPromotions: true }),
    }),
    {
      name: 'user-storage',
    }
  )
)
