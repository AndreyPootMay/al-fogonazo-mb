import { useUIStore } from '../stores/useUIStore'

export default function Header() {
  const { toggleDarkMode, darkMode, setSideMenuOpen } = useUIStore()

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-darkBg/95 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSideMenuOpen(true)}
          className="p-2 text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
          aria-label="Menu"
        >
          <i className="fas fa-bars text-lg"></i>
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <i className="fas fa-fire text-white text-sm"></i>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white uppercase tracking-tight">
            Al Fogonazo
          </span>
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 active:rotate-45 transition-transform"
        aria-label="Cambiar tema"
      >
        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
    </header>
  )
}
