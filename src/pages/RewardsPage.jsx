import { useAuthStore } from '../stores/useAuthStore'
import { useUIStore } from '../stores/useUIStore'

const tiers = [
  {
    name: 'Bronce',
    icon: 'fa-medal',
    color: '#CD7F32',
    minPoints: 0,
    discount: '0%',
    multiplier: '1x',
    benefits: ['Acumula 1 punto por cada $10', 'Acceso a promociones exclusivas'],
  },
  {
    name: 'Plata',
    icon: 'fa-award',
    color: '#C0C0C0',
    minPoints: 100,
    discount: '5%',
    multiplier: '1.25x',
    benefits: ['5% de descuento en pedidos', '1.25x multiplicador de puntos', 'Promos exclusivas Plata'],
  },
  {
    name: 'Oro',
    icon: 'fa-crown',
    color: '#FFD700',
    minPoints: 300,
    discount: '10%',
    multiplier: '1.5x',
    benefits: ['10% de descuento', '1.5x multiplicador', 'Envio gratis en pedidos +$300', 'Acceso anticipado'],
  },
  {
    name: 'Platino',
    icon: 'fa-gem',
    color: '#E5E4E2',
    minPoints: 600,
    discount: '15%',
    multiplier: '2x',
    benefits: ['15% de descuento', '2x multiplicador', 'Envio gratis siempre', 'Producto gratis en cumpleanos'],
  },
]

export default function RewardsPage() {
  const { profile, user } = useAuthStore()
  const { setAuthModalOpen } = useUIStore()

  const currentTier = profile?.rewards_tiers?.name || 'Bronce'
  const currentPoints = profile?.total_points || 0
  const totalOrders = profile?.total_orders || 0

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <i className="fas fa-star text-primary text-2xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white uppercase">Recompensas</h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
          Gana puntos con cada pedido
        </p>
      </div>

      {!user ? (
        /* Not logged in */
        <div className="bg-white dark:bg-darkCard rounded-3xl p-6 text-center border border-gray-100 dark:border-gray-800 space-y-4">
          <i className="fas fa-lock text-4xl text-gray-300 dark:text-gray-600"></i>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Unete a nuestro programa
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Registrate para empezar a acumular puntos y acceder a descuentos exclusivos.
              Recibiras promociones especiales y subiras de nivel con cada pedido.
            </p>
          </div>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform"
          >
            <i className="fas fa-user-plus mr-2"></i>
            Registrarme
          </button>
        </div>
      ) : (
        /* User stats */
        <div className="bg-white dark:bg-darkCard rounded-3xl p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: tiers.find((t) => t.name === currentTier)?.color + '20' }}
            >
              <i
                className={`fas ${tiers.find((t) => t.name === currentTier)?.icon} text-xl`}
                style={{ color: tiers.find((t) => t.name === currentTier)?.color }}
              ></i>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Tu nivel</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentTier}</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-primary">{currentPoints}</p>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Puntos</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-primary">{totalOrders}</p>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Pedidos</p>
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 px-1">
          Como funciona
        </h2>
        <div className="space-y-3">
          {[
            { icon: 'fa-shopping-bag', title: 'Ordena', desc: 'Haz tu pedido como siempre' },
            { icon: 'fa-coins', title: 'Acumula', desc: 'Gana 1 punto por cada $10' },
            { icon: 'fa-arrow-up', title: 'Sube de nivel', desc: 'Desbloquea mejores beneficios' },
            { icon: 'fa-gift', title: 'Disfruta', desc: 'Canjea descuentos y mas' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4 bg-white dark:bg-darkCard rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className={`fas ${step.icon} text-primary text-sm`}></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{step.title}</h4>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 px-1">
          Niveles de recompensa
        </h2>
        <div className="space-y-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white dark:bg-darkCard rounded-2xl p-4 border transition-all ${
                currentTier === tier.name
                  ? 'border-primary shadow-lg shadow-primary/10'
                  : 'border-gray-100 dark:border-gray-800'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <i className={`fas ${tier.icon} text-lg`} style={{ color: tier.color }}></i>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{tier.name}</h3>
                  <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
                    {tier.minPoints}+ puntos | {tier.discount} desc. | {tier.multiplier} puntos
                  </p>
                </div>
                {currentTier === tier.name && (
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase">
                    Actual
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tier.benefits.map((b, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
