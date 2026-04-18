import { useState, useEffect } from 'react'
import { sendPromoWhatsApp } from '../utils/whatsapp'

const promos = [
  {
    id: 1,
    title: 'Pollo al Carbon',
    subtitle: 'Estilo Sinaloa',
    img: '/imagenes_productos/pollo_sinaloa.jpg',
    waText: 'Hola, me interesa el Pollo al Carbon estilo Sinaloa',
  },
  {
    id: 2,
    title: 'Arrachera Premium',
    subtitle: 'Asada al fogon',
    img: '/imagenes_productos/arrachera.jpeg',
    waText: 'Hola, me interesa la Arrachera Premium',
  },
  {
    id: 3,
    title: 'Papas Asadas',
    subtitle: 'Con crema especial',
    img: '/imagenes_productos/papa_con_arrachera.jpeg',
    waText: 'Hola, me interesa las Papas Asadas',
  },
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="px-4 mt-4">
      <div className="relative h-44 rounded-3xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-darkCard">
        {promos.map((promo, index) => (
          <div
            key={promo.id}
            onClick={() => sendPromoWhatsApp(promo.waText)}
            className={`absolute inset-0 cursor-pointer transition-all duration-700 ${
              current === index
                ? 'opacity-100 translate-x-0'
                : index > current
                  ? 'opacity-0 translate-x-12'
                  : 'opacity-0 -translate-x-12'
            }`}
          >
            <img src={promo.img} alt={promo.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-1">
                Oferta de Hoy
              </span>
              <h2 className="text-white text-2xl font-bold">{promo.title}</h2>
              <p className="text-white/70 text-xs">{promo.subtitle}</p>
            </div>
          </div>
        ))}
        <div className="absolute top-4 right-6 flex gap-1.5">
          {promos.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                current === index ? 'w-6 bg-primary' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
