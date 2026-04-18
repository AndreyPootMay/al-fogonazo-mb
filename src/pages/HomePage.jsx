import { useMemo } from 'react'
import Carousel from '../components/Carousel'
import SearchBar from '../components/SearchBar'
import CategoryBar from '../components/CategoryBar'
import ProductCard from '../components/ProductCard'
import CartBar from '../components/CartBar'
import PromoPopup from '../components/PromoPopup'
import { products } from '../data/products'
import { useUIStore } from '../stores/useUIStore'

export default function HomePage() {
  const { activeCategory, searchQuery } = useUIStore()

  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return products.filter((p) => p.category === activeCategory)
  }, [activeCategory, searchQuery])

  return (
    <>
      <Carousel />
      <SearchBar />
      <CategoryBar />

      <div className="px-4 mt-4 space-y-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <i className="fas fa-search text-4xl mb-3 text-gray-300 dark:text-gray-600"></i>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              No encontramos nada parecido...
            </p>
          </div>
        )}
      </div>

      <CartBar />
      <PromoPopup />
    </>
  )
}
