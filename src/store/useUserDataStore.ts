import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Address {
  id: string
  title: string
  street: string
  number: string
  neighborhood: string
  isDefault: boolean
}

interface Card {
  id: string
  type: 'credit' | 'pix'
  brand?: string
  last4?: string
  name?: string
  label: string
}

interface Order {
  id: string
  date: string
  status: 'Entregue' | 'Cancelado'
  items: any[]
  total: number
}

interface UserDataStore {
  addresses: Address[]
  cards: Card[]
  orders: Order[]
  addAddress: (address: Address) => void
  addCard: (card: Card) => void
  addOrder: (order: Order) => void
}

export const useUserDataStore = create<UserDataStore>()(
  persist(
    (set) => ({
      addresses: [
        { id: '1', title: 'Casa', street: 'Rua das Flores', number: '123', neighborhood: 'Centro', isDefault: true },
      ],
      cards: [
        { id: '1', type: 'credit', brand: 'Mastercard', last4: '4321', name: 'João Silva', label: 'Cartão Principal' },
        { id: '2', type: 'pix', label: 'Pix Salvo' },
      ],
      orders: [
        { 
          id: '1', 
          date: '12 de Março, 20:30', 
          status: 'Entregue', 
          total: 65.90,
          items: [{ name: 'Pizza Família Calabresa', quantity: 1, totalPrice: 65.90, flavors: ['Calabresa'], border: 'Sem Borda' }]
        },
      ],
      addAddress: (address) => set((state) => ({ addresses: [...state.addresses, address] })),
      addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
    }),
    { name: 'user-data-storage' }
  )
)
