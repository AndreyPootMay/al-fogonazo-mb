import { useCartStore } from '../stores/useCartStore'
import { useUIStore } from '../stores/useUIStore'

export default function CartModal() {
  const { cart, updateQuantity, clearCart } = useCartStore()
  const { cartModalOpen, setCartModalOpen, setCheckoutModalOpen, setCheckoutStep } = useUIStore()
  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0)

  if (!cartModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bottom-sheet-overlay animate-fade-in">
      <div className="absolute inset-0" onClick={() => setCartModalOpen(false)} />
      <div className="relative w-full max-w-md bg-white dark:bg-darkCard rounded-t-[2.5rem] shadow-2xl animate-slide-up max-h-[85vh] flex flex-col">
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="px-6 pb-3 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
            Tu Pedido
          </h3>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-400 hover:text-red-500 font-medium px-2 py-1"
              >
                Vaciar
              </button>
            )}
            <button onClick={() => setCartModalOpen(false)} className="text-gray-400 p-1">
              <i className="fas fa-times-circle text-2xl"></i>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 flex-1 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 opacity-50">
              <i className="fas fa-shopping-basket text-4xl mb-3 text-gray-300 dark:text-gray-600"></i>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Tu carrito esta vacio
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase leading-none mb-1 truncate">
                    {item.name}
                  </h4>
                  <span className="text-primary font-bold text-sm">
                    ${item.price * item.quantity}
                  </span>
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-white"
                  >
                    <i className="fas fa-minus text-xs"></i>
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900 dark:text-white text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-white"
                  >
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Subtotal</span>
              <span className="text-xl font-bold text-primary">${cartTotal}</span>
            </div>
            <button
              onClick={() => {
                setCartModalOpen(false)
                setCheckoutStep(1)
                setCheckoutModalOpen(true)
              }}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-lg active:scale-[0.98] transition-transform"
            >
              Confirmar y Pagar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
