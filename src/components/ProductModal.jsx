import { useUIStore } from '../stores/useUIStore'
import { useCartStore } from '../stores/useCartStore'

export default function ProductModal() {
  const { selectedProduct, productModalOpen, setSelectedProduct } = useUIStore()
  const addToCart = useCartStore((s) => s.addToCart)

  if (!productModalOpen || !selectedProduct) return null

  const close = () => setSelectedProduct(null)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bottom-sheet-overlay animate-fade-in">
      <div className="absolute inset-0" onClick={close} />
      <div className="relative w-full max-w-md bg-white dark:bg-darkCard rounded-t-[2.5rem] shadow-2xl animate-slide-up max-h-[85vh] flex flex-col overflow-hidden">
        {/* Image */}
        <div className="relative h-56 flex-shrink-0">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={close}
            className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-white text-xl font-bold uppercase">{selectedProduct.name}</h2>
            <span className="text-primary font-bold text-2xl">${selectedProduct.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              Descripcion
            </h3>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {selectedProduct.includes && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                <i className="fas fa-utensils mr-1.5"></i>
                Incluye
              </h3>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {selectedProduct.includes}
              </p>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="p-6 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => {
              addToCart(selectedProduct)
              close()
            }}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
          >
            <i className="fas fa-plus"></i>
            Agregar al pedido - ${selectedProduct.price}
          </button>
        </div>
      </div>
    </div>
  )
}
