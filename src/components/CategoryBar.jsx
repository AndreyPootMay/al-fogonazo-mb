import { useRef } from 'react'
import { categories } from '../data/products'
import { useUIStore } from '../stores/useUIStore'

export default function CategoryBar() {
  const { activeCategory, setActiveCategory, searchQuery } = useUIStore()
  const scrollRef = useRef(null)

  if (searchQuery) return null

  const scrollToBtn = (slug) => {
    const btn = document.getElementById('cat-' + slug)
    if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div className="mt-5 relative">
      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar flex px-4 gap-2.5 sticky top-[56px] bg-gray-50/90 dark:bg-darkBg/95 py-3 z-30"
      >
        {categories.map((cat) => (
          <button
            key={cat.slug}
            id={`cat-${cat.slug}`}
            onClick={() => {
              setActiveCategory(cat.name)
              scrollToBtn(cat.slug)
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm whitespace-nowrap border ${
              activeCategory === cat.name
                ? 'bg-primary border-primary text-white scale-105'
                : 'bg-white dark:bg-darkCard border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <i className={`fas ${cat.icon} text-xs`}></i>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 dark:from-darkBg to-transparent pointer-events-none z-30" />
    </div>
  )
}
