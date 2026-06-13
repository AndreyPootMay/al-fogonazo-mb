const sections = [
  {
    title: '1. Aceptacion de terminos',
    content: `Al utilizar la aplicacion de Asadero Al Fogonazo para consultar nuestro menu o realizar pedidos, aceptas estos terminos y condiciones en su totalidad. Si no estas de acuerdo con alguno de estos terminos, te pedimos no utilizar nuestro servicio. El uso continuado de la aplicacion constituye aceptacion plena de estos terminos.`,
  },
  {
    title: '2. Descripcion del servicio',
    content: `Asadero Al Fogonazo es un establecimiento de venta de alimentos preparados — especializado en pollo asado al carbon estilo Sinaloa, arrachera y acompanantes — con opcion de entrega a domicilio en la zona de Cancun, Quintana Roo. Los pedidos se gestionan a traves de la aplicacion y se confirman via WhatsApp con nuestro equipo. El servicio esta sujeto a disponibilidad de productos y horarios de operacion.`,
  },
  {
    title: '3. Pedidos y confirmacion',
    content: `Los pedidos realizados a traves de la aplicacion son solicitudes y no garantias de servicio. La confirmacion del pedido esta sujeta a la disponibilidad de productos al momento de recibirlo. Nos reservamos el derecho de cancelar o modificar un pedido en caso de falta de inventario, cierre anticipado o situaciones extraordinarias. En caso de cancelacion por nuestra parte, se notificara al cliente de inmediato via WhatsApp.`,
  },
  {
    title: '4. Precios y pagos',
    content: `Los precios mostrados en la aplicacion son en pesos mexicanos (MXN) e incluyen IVA. El costo de envio es adicional y se calcula automaticamente segun la distancia entre el punto de entrega y nuestro establecimiento. Nos reservamos el derecho de actualizar precios sin previo aviso; el precio aplicable es el vigente al momento de enviar tu pedido via WhatsApp. Aceptamos pago en efectivo y con tarjeta mediante terminal en la entrega.`,
  },
  {
    title: '5. Zona y tiempos de entrega',
    content: `Realizamos entregas en la zona de Cancun, Quintana Roo. Los tiempos de entrega son estimados (generalmente entre 30 y 60 minutos) y pueden variar segun la demanda, condiciones de trafico o clima. Asadero Al Fogonazo no se hace responsable por retrasos causados por factores externos. Es responsabilidad del cliente proporcionar una direccion precisa y estar disponible para recibir el pedido. Si el cliente no puede recibir el pedido al momento de la entrega, se coordinara una segunda visita o se podra cancelar el pedido.`,
  },
  {
    title: '6. Cancelaciones y cambios',
    content: `Una vez confirmado el pedido via WhatsApp, las cancelaciones o cambios deben solicitarse lo antes posible y estan sujetos a aprobacion segun el estado de preparacion del pedido. Si el pedido ya esta en preparacion o en camino, no sera posible realizar cambios ni cancelaciones. No se realizan reembolsos por productos ya preparados o entregados.`,
  },
  {
    title: '7. Calidad e inocuidad alimentaria',
    content: `Todos nuestros productos son preparados con ingredientes frescos y bajo estrictas normas de higiene. Sin embargo, el cliente es responsable de consumir los alimentos en condiciones adecuadas de temperatura y dentro del tiempo razonable tras la entrega. Al Fogonazo no se hace responsable por enfermedades derivadas del mal manejo o almacenamiento de los alimentos una vez entregados. Si presentas alguna alergia alimentaria conocida, informanos antes de realizar tu pedido.`,
  },
  {
    title: '8. Programa de recompensas',
    content: `El programa de recompensas de Al Fogonazo permite acumular puntos por pedidos realizados. Los puntos son personales e intransferibles. Al Fogonazo se reserva el derecho de modificar, suspender o terminar el programa en cualquier momento sin previo aviso. Los puntos acumulados no tienen valor monetario y solo pueden canjearse por los beneficios establecidos en cada nivel. Los puntos pueden expirar si no se realiza ningun pedido en un periodo de 6 meses consecutivos.`,
  },
  {
    title: '9. Uso aceptable de la aplicacion',
    content: `El usuario se compromete a utilizar la aplicacion unicamente para fines legitimos relacionados con la realizacion de pedidos. Queda prohibido: usar la aplicacion para fines fraudulentos, realizar pedidos falsos o con informacion incorrecta, intentar acceder a partes restringidas del sistema, o cualquier uso que pueda daniar el servicio o a terceros. Nos reservamos el derecho de bloquear el acceso a usuarios que incumplan estas condiciones.`,
  },
  {
    title: '10. Propiedad intelectual',
    content: `Todo el contenido de la aplicacion — incluyendo logotipos, imagenes, textos, diseno y codigo — es propiedad de Asadero Al Fogonazo o de sus respectivos titulares, y esta protegido por las leyes de propiedad intelectual vigentes en los Estados Unidos Mexicanos. Queda estrictamente prohibida su reproduccion, distribucion o uso comercial sin autorizacion previa y por escrito.`,
  },
  {
    title: '11. Limitacion de responsabilidad',
    content: `Asadero Al Fogonazo no sera responsable por danos indirectos, incidentales o consecuentes que resulten del uso o imposibilidad de uso de nuestro servicio. Nuestra responsabilidad total ante cualquier reclamacion se limita al monto del pedido en cuestion. No garantizamos la disponibilidad ininterrumpida de la aplicacion y no nos hacemos responsables por fallas tecnicas, interrupciones del servicio o perdida de datos.`,
  },
  {
    title: '12. Privacidad de datos',
    content: `El uso de tu informacion personal se rige por nuestra Politica de Privacidad, disponible en la seccion correspondiente de la aplicacion. Al usar el servicio, consientes el tratamiento de tus datos conforme a dicha politica. No vendemos ni compartimos tu informacion personal con terceros sin tu consentimiento, salvo obligacion legal.`,
  },
  {
    title: '13. Modificaciones a los terminos',
    content: `Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios seran efectivos al ser publicados en la aplicacion. Te recomendamos revisar periodicamente esta seccion. El uso continuado del servicio despues de cualquier modificacion implica la aceptacion de los nuevos terminos.`,
  },
  {
    title: '14. Legislacion aplicable y jurisdiccion',
    content: `Estos terminos y condiciones se rigen por las leyes vigentes en los Estados Unidos Mexicanos. Cualquier controversia derivada del uso del servicio sera resuelta ante los tribunales competentes de Cancun, Quintana Roo, Mexico, renunciando expresamente a cualquier otro fuero que pudiera corresponder.`,
  },
]

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
          Ultima actualizacion: Junio 2026
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
        <p className="text-xs font-medium text-amber-700 dark:text-amber-300 leading-relaxed">
          <i className="fas fa-circle-info mr-1.5"></i>
          Estos terminos regulan el uso de la aplicacion de <strong>Asadero Al Fogonazo</strong> y la contratacion de nuestros servicios de venta y entrega de alimentos. Leer antes de realizar un pedido.
        </p>
      </div>

      <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
        {sections.map((section) => (
          <section key={section.title} className="p-5 space-y-2">
            <h2 className="font-bold text-sm text-gray-900 dark:text-white">{section.title}</h2>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-600 pb-4">
        Asadero Al Fogonazo · Cancun, Quintana Roo, Mexico
      </p>
    </div>
  )
}
