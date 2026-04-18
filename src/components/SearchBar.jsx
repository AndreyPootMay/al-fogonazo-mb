import { useUIStore } from '../stores/useUIStore'

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useUIStore()

  return (
    <div className="px-4 mt-5">
      <div className="relative group">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Busca tu antojo..."
          className="w-full bg-white dark:bg-darkCard text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 py-3.5 pl-12 pr-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}
