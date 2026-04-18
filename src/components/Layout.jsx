import { useEffect } from 'react'
import Header from './Header'
import BottomNav from './BottomNav'
import SideMenu from './SideMenu'
import CartModal from './CartModal'
import CheckoutModal from './CheckoutModal'
import AuthModal from './AuthModal'
import ProductModal from './ProductModal'
import { useUIStore } from '../stores/useUIStore'
import { useAuthStore } from '../stores/useAuthStore'

export default function Layout({ children }) {
  const { darkMode } = useUIStore()
  const { initialize } = useAuthStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkBg transition-colors">
      <Header />
      <main className="max-w-md mx-auto pb-32">{children}</main>
      <BottomNav />
      <SideMenu />
      <CartModal />
      <CheckoutModal />
      <AuthModal />
      <ProductModal />
    </div>
  )
}
