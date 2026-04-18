import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
  persist(
    (set) => ({
      darkMode: false,
      sideMenuOpen: false,
      cartModalOpen: false,
      checkoutModalOpen: false,
      authModalOpen: false,
      productModalOpen: false,
      promoPopupOpen: false,
      selectedProduct: null,
      activeCategory: 'POLLOS',
      searchQuery: '',
      checkoutStep: 1,

      toggleDarkMode: () =>
        set((s) => {
          const next = !s.darkMode
          if (next) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { darkMode: next }
        }),

      setDarkMode: (val) => {
        if (val) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        set({ darkMode: val })
      },

      setSideMenuOpen: (val) => set({ sideMenuOpen: val }),
      setCartModalOpen: (val) => set({ cartModalOpen: val }),
      setCheckoutModalOpen: (val) => set({ checkoutModalOpen: val }),
      setAuthModalOpen: (val) => set({ authModalOpen: val }),
      setProductModalOpen: (val) => set({ productModalOpen: val }),
      setSelectedProduct: (product) => set({ selectedProduct: product, productModalOpen: !!product }),
      setPromoPopupOpen: (val) => set({ promoPopupOpen: val }),
      setActiveCategory: (cat) => set({ activeCategory: cat }),
      setSearchQuery: (q) => set({ searchQuery: q }),
      setCheckoutStep: (step) => set({ checkoutStep: step }),
    }),
    {
      name: 'fogonazo_ui',
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
)
