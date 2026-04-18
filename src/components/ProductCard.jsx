import { useCartStore } from '../stores/useCartStore'
import { useUIStore } from '../stores/useUIStore'

export default function ProductCard({ product }) {
  const addToCart = useCartStore((s) => s.addToCart)
  const setSelectedProduct = useUIStore((s) => s.setSelectedProduct)

  return (
    <div className="flex bg-white dark:bg-darkCard rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all">
      <button
        onClick={() => setSelectedProduct(product)}
        className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          loading="lazy"
        />
      </button>
      <div className="ml-3 flex-1 flex flex-col justify-between min-w-0">
        <div>
          <button
            onClick={() => setSelectedProduct(product)}
            className="text-left w-full"
          >
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase leading-tight">
              {product.name}
            </h3>
          </button>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {product.description}
          </p>
          {product.includes && (
            <p className="text-[11px] font-medium text-primary/70 dark:text-primary/60 mt-0.5 line-clamp-1">
              <i className="fas fa-utensils mr-1 text-[9px]"></i>
              {product.includes}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="font-bold text-primary text-lg">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-primary text-white p-2.5 rounded-xl shadow-md active:scale-90 transition-transform"
            aria-label="Agregar al carrito"
          >
            <i className="fas fa-plus text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
