export default function TermsPage() {
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <i className="fas fa-scale-balanced text-primary text-2xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white uppercase">
          Terminos y Condiciones
        </h1>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
          Ultima actualizacion: Abril 2026
        </p>
      </div>

      <div className="bg-white dark:bg-darkCard rounded-2xl p-5 border border-gray-100 dark:border-gray-800 space-y-5">
        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">1. Aceptacion de terminos</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Al utilizar la aplicacion web de Al Fogonazo para realizar pedidos, aceptas estos terminos
            y condiciones en su totalidad. Si no estas de acuerdo con alguno de estos terminos, te
            pedimos no utilizar nuestro servicio.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">2. Servicio</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Al Fogonazo es un servicio de venta de alimentos preparados con opcion de entrega a
            domicilio en la zona de Cancun, Quintana Roo. El servicio esta sujeto a disponibilidad
            de productos y horarios de operacion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">3. Pedidos</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Los pedidos se realizan a traves de nuestra aplicacion web y se confirman via WhatsApp.
            La confirmacion del pedido esta sujeta a la disponibilidad de los productos y la aceptacion
            por parte de nuestro equipo. Nos reservamos el derecho de rechazar pedidos.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">4. Precios y pagos</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Los precios mostrados incluyen IVA. El costo de envio es adicional y se calcula segun
            la distancia. Nos reservamos el derecho de modificar precios sin previo aviso. El precio
            aplicable es el vigente al momento de confirmar tu pedido.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">5. Entrega</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Los tiempos de entrega son estimados y pueden variar segun la demanda y condiciones
            de trafico. Al Fogonazo no se hace responsable por retrasos causados por factores externos.
            Es responsabilidad del cliente proporcionar una ubicacion precisa y estar disponible
            para recibir el pedido.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">6. Programa de recompensas</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            El programa de recompensas esta disponible exclusivamente para usuarios registrados.
            Los puntos se acumulan al completar pedidos y son intransferibles. Al Fogonazo se reserva
            el derecho de modificar, suspender o terminar el programa en cualquier momento. Los puntos
            pueden expirar si no se realiza ningun pedido en un periodo de 6 meses.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">7. Cuenta de usuario</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Es opcional crear una cuenta. Al registrarte, eres responsable de mantener la
            confidencialidad de tu contrasena. Puedes realizar pedidos como invitado sin necesidad
            de registro, pero no acumularas puntos de recompensas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">8. Propiedad intelectual</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Todo el contenido de la aplicacion (logotipos, imagenes, textos, diseno) es propiedad
            de Al Fogonazo y esta protegido por las leyes de propiedad intelectual. Queda prohibida
            su reproduccion sin autorizacion previa.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">9. Limitacion de responsabilidad</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Al Fogonazo no sera responsable por danos indirectos, incidentales o consecuentes que
            resulten del uso de nuestro servicio. Nuestra responsabilidad total se limita al monto
            del pedido en cuestion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">10. Modificaciones</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios
            seran efectivos al ser publicados en la aplicacion. El uso continuado del servicio despues
            de las modificaciones implica la aceptacion de los nuevos terminos.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">11. Legislacion aplicable</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Estos terminos se rigen por las leyes vigentes en los Estados Unidos Mexicanos.
            Cualquier controversia sera resuelta ante los tribunales competentes de Cancun,
            Quintana Roo, Mexico.
          </p>
        </section>
      </div>
    </div>
  )
}
