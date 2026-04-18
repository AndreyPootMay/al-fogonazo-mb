import { useState, useEffect } from 'react'
import { dayPromos } from '../data/products'
import { useCartStore } from '../stores/useCartStore'

export default function PromoPopup() {
  const [visible, setVisible] = useState(false)
  const [todayPromos, setTodayPromos] = useState([])
  const addToCart = useCartStore((s) => s.addToCart)

  useEffect(() => {
    const today = new Date().getDay()
    const promos = dayPromos.filter((p) => p.dayOfWeek === today)
    if (promos.length > 0) {
      setTodayPromos(promos)
      const dismissed = sessionStorage.getItem('promo_dismissed')
      if (!dismissed) {
        const timer = setTimeout(() => setVisible(true), 2500)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  if (!visible || todayPromos.length === 0) return null

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('promo_dismissed', 'true')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative w-full max-w-sm bg-white dark:bg-darkCard rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-5 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-fire-flame-curved text-white text-2xl"></i>
          </div>
          <h2 className="text-white text-xl font-bold uppercase">Promo del dia</h2>
          <p className="text-white/80 text-xs mt-1">Solo por hoy</p>
        </div>

        {/* Promos */}
        <div className="p-5 space-y-3 max-h-[50vh] overflow-y-auto">
          {todayPromos.map((promo) => (
            <div
              key={promo.id}
              className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{promo.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{promo.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-bold text-base">${promo.promoPrice}</span>
                  <span className="text-gray-400 text-xs line-through">${promo.originalPrice}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart({
                    id: `promo-${promo.id}`,
                    name: `PROMO: ${promo.title}`,
                    price: promo.promoPrice,
                    image: promo.image,
                    description: promo.description,
                  })
                  dismiss()
                }}
                className="bg-primary text-white p-2 rounded-xl flex-shrink-0 active:scale-90 transition-transform"
              >
                <i className="fas fa-plus text-sm"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Dismiss */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={dismiss}
            className="w-full text-center text-sm text-gray-400 dark:text-gray-500 font-medium py-2 hover:text-gray-600 transition-colors"
          >
            No gracias, ver el menu
          </button>
        </div>
      </div>
    </div>
  )
}
