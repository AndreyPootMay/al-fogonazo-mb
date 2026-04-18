export default function PrivacyPage() {
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <i className="fas fa-shield-halved text-primary text-2xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white uppercase">Privacidad</h1>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
          Ultima actualizacion: Abril 2026
        </p>
      </div>

      <div className="bg-white dark:bg-darkCard rounded-2xl p-5 border border-gray-100 dark:border-gray-800 space-y-5">
        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">1. Informacion que recopilamos</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Recopilamos la informacion que nos proporcionas directamente: nombre, numero de telefono,
            direccion de correo electronico, ubicacion de entrega y datos de pedidos realizados.
            Si te registras en nuestro sistema de recompensas, almacenamos tu historial de puntos y nivel.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">2. Uso de la informacion</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Utilizamos tu informacion para: procesar y entregar tus pedidos, comunicarnos contigo sobre
            tu pedido, administrar tu cuenta de recompensas, enviarte promociones y ofertas especiales
            (si aceptaste recibirlas), y mejorar nuestros servicios.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">3. Proteccion de datos</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Implementamos medidas de seguridad tecnicas y organizativas para proteger tu informacion
            personal contra acceso no autorizado, alteracion, divulgacion o destruccion. Utilizamos
            encriptacion SSL/TLS para la transmision de datos y almacenamos la informacion en servidores seguros.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">4. Compartir informacion</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            No vendemos, comercializamos ni transferimos tu informacion personal a terceros, excepto
            a proveedores de servicios que nos ayudan a operar nuestro sitio y negocio (como servicios
            de pago y autenticacion), siempre que dichos terceros acepten mantener esta informacion confidencial.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">5. Ubicacion</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Solicitamos acceso a tu ubicacion unicamente para calcular el costo de envio y facilitar
            la entrega de tu pedido. Esta informacion se comparte con nuestro equipo de entrega
            exclusivamente para este fin.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">6. Tus derechos</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos
            personales (derechos ARCO). Para ejercer estos derechos, contactanos a traves de nuestro
            WhatsApp o correo electronico.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">7. Cookies</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Utilizamos almacenamiento local (localStorage) para guardar tus preferencias de tema
            y tu carrito de compras. No utilizamos cookies de rastreo de terceros.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">8. Contacto</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            Si tienes preguntas sobre esta politica de privacidad, puedes contactarnos a traves de
            nuestro WhatsApp al numero disponible en la aplicacion.
          </p>
        </section>
      </div>
    </div>
  )
}
