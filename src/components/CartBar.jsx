import { useCartStore } from '../stores/useCartStore'
import { useUIStore } from '../stores/useUIStore'

export default function CartBar() {
  const cart = useCartStore((s) => s.cart)
  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0)
  const setCartModalOpen = useUIStore((s) => s.setCartModalOpen)

  if (cart.length === 0) return null

  return (
    <div className="fixed bottom-14 left-0 right-0 p-4 z-30 flex justify-center">
      <button
        onClick={() => setCartModalOpen(true)}
        className="w-full max-w-md bg-primary text-white h-14 rounded-2xl flex justify-between items-center px-5 shadow-2xl shadow-primary/30 active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <i className="fas fa-shopping-basket text-sm"></i>
          </div>
          <div className="text-left leading-none">
            <p className="font-bold text-sm">{cartCount} producto{cartCount !== 1 ? 's' : ''}</p>
            <p className="text-[10px] uppercase font-bold opacity-70">Ver mi pedido</p>
          </div>
        </div>
        <span className="font-bold text-xl">${cartTotal}</span>
      </button>
    </div>
  )
}
