import { Link } from 'react-router-dom'

export default function PoliciesPage() {
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <i className="fas fa-file-contract text-primary text-2xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white uppercase">Politicas</h1>
      </div>

      {/* Politica de Compra */}
      <section className="bg-white dark:bg-darkCard rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
        <h2 className="font-bold text-base text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <i className="fas fa-shopping-cart text-primary text-sm"></i>
          Politica de Compra
        </h2>
        <div className="space-y-2 text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>1. Todos los precios estan expresados en pesos mexicanos (MXN) e incluyen IVA.</p>
          <p>2. El pedido minimo para servicio a domicilio es de $60 MXN.</p>
          <p>3. Los precios pueden variar sin previo aviso. El precio vigente es el mostrado al momento de realizar tu pedido.</p>
          <p>4. Aceptamos pago en efectivo y tarjeta de credito/debito (terminal en punto de entrega).</p>
          <p>5. Al confirmar tu pedido, este se enviara via WhatsApp a nuestro equipo para su preparacion.</p>
          <p>6. El costo de envio se calcula automaticamente segun la distancia entre tu ubicacion y nuestro establecimiento.</p>
          <p>7. Los tiempos de preparacion estimados son de 20 a 40 minutos, dependiendo de la demanda.</p>
        </div>
      </section>

      {/* Politica de Cancelacion */}
      <section className="bg-white dark:bg-darkCard rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
        <h2 className="font-bold text-base text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <i className="fas fa-ban text-primary text-sm"></i>
          Politica de Cancelacion
        </h2>
        <div className="space-y-2 text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>1. Puedes cancelar tu pedido sin costo alguno dentro de los primeros 5 minutos despues de haber confirmado el pedido, notificando al mismo numero de WhatsApp.</p>
          <p>2. Despues de 5 minutos, si el pedido ya esta en preparacion, no es posible cancelar y se cobrara el monto total.</p>
          <p>3. Si el pedido presenta un problema de calidad o error en los productos enviados, contactanos inmediatamente para resolverlo.</p>
          <p>4. No se aceptan devoluciones parciales de pedidos ya entregados.</p>
          <p>5. En caso de retraso mayor a 60 minutos sin justificacion, el cliente podra solicitar la cancelacion con reembolso total.</p>
        </div>
      </section>

      {/* Politica de Reservacion */}
      <section className="bg-white dark:bg-darkCard rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
        <h2 className="font-bold text-base text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <i className="fas fa-calendar-check text-primary text-sm"></i>
          Politica de Reservacion
        </h2>
        <div className="space-y-2 text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>1. Se aceptan pedidos con reservacion para eventos o reuniones con al menos 24 horas de anticipacion.</p>
          <p>2. Para pedidos mayores a $1,000 MXN, se requiere un anticipo del 50% al momento de la reservacion.</p>
          <p>3. Las cancelaciones de reservaciones deben realizarse con al menos 12 horas de anticipacion para obtener reembolso completo del anticipo.</p>
          <p>4. Cancelaciones fuera de plazo perderan el 30% del anticipo como cargo administrativo.</p>
          <p>5. Cambios en la cantidad de productos reservados se aceptan hasta 6 horas antes de la hora de entrega, sujeto a disponibilidad.</p>
          <p>6. Para hacer una reservacion, contactanos directamente por WhatsApp.</p>
        </div>
      </section>

      {/* Navigation links */}
      <div className="flex flex-col gap-2">
        <Link
          to="/privacidad"
          className="flex items-center justify-between bg-white dark:bg-darkCard rounded-2xl p-4 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center gap-3">
            <i className="fas fa-shield-halved text-primary"></i>
            <span className="text-sm font-bold text-gray-900 dark:text-white">Politica de Privacidad</span>
          </div>
          <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
        </Link>
        <Link
          to="/terminos"
          className="flex items-center justify-between bg-white dark:bg-darkCard rounded-2xl p-4 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center gap-3">
            <i className="fas fa-scale-balanced text-primary"></i>
            <span className="text-sm font-bold text-gray-900 dark:text-white">Terminos y Condiciones</span>
          </div>
          <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
        </Link>
      </div>
    </div>
  )
}
