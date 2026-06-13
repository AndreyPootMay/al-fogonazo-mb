import { Link } from 'react-router-dom'
import { useUIStore } from '../stores/useUIStore'

export default function SideMenu() {
  const { sideMenuOpen, setSideMenuOpen } = useUIStore()

  if (!sideMenuOpen) return null

  const close = () => setSideMenuOpen(false)

  const menuLinks = [
    { to: '/', label: 'Inicio', icon: 'fa-home' },
    { to: '/recompensas', label: 'Recompensas', icon: 'fa-star' },
    { to: '/politicas', label: 'Politicas de Compra', icon: 'fa-file-contract' },
    { to: '/privacidad', label: 'Politica de Privacidad', icon: 'fa-shield-halved' },
    { to: '/terminos', label: 'Terminos y Condiciones', icon: 'fa-scale-balanced' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
      <div className="relative w-72 max-w-[80vw] bg-white dark:bg-darkCard h-full shadow-2xl animate-slide-in-left flex flex-col">
        {/* Header */}
        <div className="p-6 bg-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-fire text-white text-xl"></i>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Al Fogonazo</h2>
              <p className="text-white/70 text-xs">Pollo asado y carnes</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={close}
              className="flex items-center gap-4 px-6 py-3.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <i className={`fas ${link.icon} w-5 text-center text-gray-400 dark:text-gray-500`}></i>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
