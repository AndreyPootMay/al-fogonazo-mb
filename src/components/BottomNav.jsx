import { useNavigate, useLocation } from 'react-router-dom'
import { useUIStore } from '../stores/useUIStore'
import { useCartStore } from '../stores/useCartStore'
import { useAuthStore } from '../stores/useAuthStore'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setCartModalOpen, setAuthModalOpen } = useUIStore()
  const cart = useCartStore((s) => s.cart)
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0)
  const { user } = useAuthStore()

  const tabs = [
    { id: 'home', icon: 'fa-fire', label: 'Inicio', action: () => navigate('/') },
    { id: 'rewards', icon: 'fa-star', label: 'Puntos', action: () => navigate('/recompensas') },
    { id: 'cart', icon: 'fa-shopping-bag', label: 'Pedido', action: () => setCartModalOpen(true), badge: cartCount },
    { id: 'account', icon: 'fa-user', label: 'Cuenta', action: () => user ? navigate('/cuenta') : setAuthModalOpen(true) },
  ]

  const activeTab = location.pathname === '/' ? 'home' : location.pathname === '/recompensas' ? 'rewards' : null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-darkCard/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
      <div className="max-w-md mx-auto flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={tab.action}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors relative ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <div className="relative">
              <i className={`fas ${tab.icon} text-lg`}></i>
              {tab.badge > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
