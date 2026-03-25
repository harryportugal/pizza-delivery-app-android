import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string;
  type?: 'pizza' | 'drink';
  name: string;
  size?: string;
  flavors?: string[];
  border?: string;
  basePrice: number;
  extrasPrice?: number;
  totalPrice: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, action: 'increment' | 'decrement') => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (i) => {
            if (item.type === 'drink') {
              return i.type === 'drink' && i.name === item.name;
            }
            return i.type !== 'drink' &&
                   i.size === item.size && 
                   i.border === item.border && 
                   (i.flavors?.length || 0) === (item.flavors?.length || 0) &&
                   (i.flavors || []).every(f => (item.flavors || []).includes(f));
          }
        );

        if (existingItemIndex > -1) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += item.quantity;
          return { items: newItems };
        }

        return { 
          items: [...state.items, { ...item, id: Math.random().toString(36).substring(2, 9) }] 
        };
      }),
      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      updateQuantity: (id, action) => set((state) => {
        const newItems = state.items.map((item) => {
          if (item.id === id) {
            const newQuantity = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: newQuantity };
          }
          return item;
        }).filter((item) => item.quantity > 0);
        return { items: newItems };
      }),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage',
    }
  )
)
