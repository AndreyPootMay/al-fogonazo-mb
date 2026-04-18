const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5219983170365'

export function sendOrderWhatsApp({ cart, user, address, distance, deliveryFee, cartTotal }) {
  const items = cart
    .map((i) => `- ${i.quantity}x ${i.name} ($${i.price * i.quantity})`)
    .join('\n')

  const payment =
    user.paymentMethod === 'Efectivo'
      ? `Efectivo (El cliente pagara con billete de: $${user.changeOf || 'Cambio exacto'})`
      : user.paymentMethod

  const text = `🔥 *PEDIDO - AL FOGONAZO*

👤 *Cliente:* ${user.name}
📞 *Tel:* ${user.phone}
📍 *Ubicacion:* ${address}

📏 *Distancia:* ${distance.toFixed(1)}km
🚚 *Envio:* $${deliveryFee}

🍗 *Productos:*
${items}

💳 *Metodo de Pago:* ${payment}
💰 *TOTAL:* $${cartTotal + deliveryFee}`

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
}

export function sendPromoWhatsApp(text) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
}
