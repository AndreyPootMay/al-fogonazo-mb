import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id)
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        })
      },

      updateQuantity: (id, delta) => {
        set((state) => {
          const updated = state.cart
            .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
            .filter((i) => i.quantity > 0)
          return { cart: updated }
        })
      },

      removeFromCart: (id) => {
        set((state) => ({ cart: state.cart.filter((i) => i.id !== id) }))
      },

      clearCart: () => set({ cart: [] }),

      get cartTotal() {
        return get().cart.reduce((acc, i) => acc + i.price * i.quantity, 0)
      },

      get cartCount() {
        return get().cart.reduce((acc, i) => acc + i.quantity, 0)
      },
    }),
    {
      name: 'fogonazo_cart',
    }
  )
)
