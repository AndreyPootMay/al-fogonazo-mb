import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useCartStore } from '../stores/useCartStore'
import { useUIStore } from '../stores/useUIStore'
import { useAuthStore } from '../stores/useAuthStore'
import { supabase } from '../lib/supabase'
import { getUserLocation, calculateDistance, calculateDeliveryFee, getMapsLink } from '../utils/delivery'
import { sendOrderWhatsApp } from '../utils/whatsapp'

export default function CheckoutModal() {
  const { checkoutModalOpen, setCheckoutModalOpen, checkoutStep, setCheckoutStep } = useUIStore()
  const { cart, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    paymentMethod: 'Efectivo',
    changeOf: '',
  })
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState('')
  const [distance, setDistance] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [locating, setLocating] = useState(false)

  const handleLocate = async () => {
    setLocating(true)
    try {
      const loc = await getUserLocation()
      setLocation(loc)
      setAddress(getMapsLink(loc.latitude, loc.longitude))
      const dist = calculateDistance(loc.latitude, loc.longitude)
      setDistance(dist)
      setDeliveryFee(calculateDeliveryFee(dist))
    } catch {
      alert('No se pudo obtener tu ubicacion. Asegurate de permitir el acceso.')
    } finally {
      setLocating(false)
    }
  }

  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()
      if (error) throw error
      return data
    },
  })

  const handleSubmitOrder = async () => {
    const orderData = {
      user_id: user?.id || null,
      customer_name: form.name,
      customer_phone: form.phone,
      delivery_address: address,
      delivery_lat: location?.latitude,
      delivery_lng: location?.longitude,
      delivery_distance: distance,
      delivery_fee: deliveryFee,
      subtotal: cartTotal,
      total: cartTotal + deliveryFee,
      payment_method: form.paymentMethod,
      change_amount: form.paymentMethod === 'Efectivo' ? Number(form.changeOf) || null : null,
      whatsapp_sent: true,
      whatsapp_sent_at: new Date().toISOString(),
    }

    try {
      const order = await createOrderMutation.mutateAsync(orderData)

      // Save order items
      const items = cart.map((item) => ({
        order_id: order.id,
        product_id: typeof item.id === 'number' ? item.id : null,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }))
      await supabase.from('order_items').insert(items)
    } catch {
      // Order saving failed silently - WhatsApp will still be sent
    }

    sendOrderWhatsApp({
      cart,
      user: form,
      address,
      distance,
      deliveryFee,
      cartTotal,
    })

    clearCart()
    setCheckoutModalOpen(false)
    setCheckoutStep(1)
  }

  if (!checkoutModalOpen) return null

  const canContinue = form.name.trim() && address

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bottom-sheet-overlay animate-fade-in">
      <div className="absolute inset-0" onClick={() => setCheckoutModalOpen(false)} />
      <div className="relative w-full max-w-md bg-white dark:bg-darkCard rounded-t-[2.5rem] animate-slide-up max-h-[90vh] flex flex-col">
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="px-6 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase">
              Checkout
            </h3>
            <button onClick={() => setCheckoutModalOpen(false)} className="text-gray-400 p-1">
              <i className="fas fa-times-circle text-2xl"></i>
            </button>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setCheckoutStep(1)}
              className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${
                checkoutStep === 1
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-400 opacity-60'
              }`}
            >
              1. ENVIO
            </button>
            <button
              disabled={!canContinue}
              onClick={() => setCheckoutStep(2)}
              className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${
                checkoutStep === 2
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-400 opacity-60'
              }`}
            >
              2. PAGO
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 flex-1 space-y-5">
          {/* Step 1: Delivery Info */}
          {checkoutStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2 tracking-widest">
                  Quien recibe?
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre completo"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl py-3.5 px-5 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors text-sm font-medium"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Tu WhatsApp (10 digitos)"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl py-3.5 px-5 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors text-sm font-medium"
                />
              </div>

              <div className="p-5 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl text-center space-y-3">
                {!address ? (
                  <div className="space-y-3">
                    <i className="fas fa-map-marked-alt text-3xl text-primary opacity-30"></i>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Fija tu ubicacion para el envio
                    </p>
                    <button
                      onClick={handleLocate}
                      disabled={locating}
                      className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs active:scale-95 transition-transform disabled:opacity-50"
                    >
                      {locating ? (
                        <><i className="fas fa-spinner fa-spin mr-2"></i>Obteniendo...</>
                      ) : (
                        <>📍 OBTENER UBICACION</>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="text-left space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      Ubicacion obtenida correctamente
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href={address}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary text-xs underline font-medium"
                      >
                        Ver en mapa
                      </a>
                      <span className="text-xs font-bold text-gray-400">
                        {distance.toFixed(1)} km - Envio: ${deliveryFee}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                disabled={!canContinue}
                onClick={() => setCheckoutStep(2)}
                className="w-full bg-primary text-white py-3.5 rounded-2xl font-black disabled:opacity-30 transition-all uppercase text-sm tracking-widest shadow-xl shadow-primary/20"
              >
                Continuar
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {checkoutStep === 2 && (
            <div className="space-y-5">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2 tracking-widest">
                  Metodo de Pago
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setForm({ ...form, paymentMethod: 'Efectivo' })}
                    className={`py-4 border-2 rounded-2xl font-bold transition-all text-sm ${
                      form.paymentMethod === 'Efectivo'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 opacity-50'
                    }`}
                  >
                    <i className="fas fa-money-bill-wave mb-2 text-lg block"></i>
                    Efectivo
                  </button>
                  <button
                    onClick={() => setForm({ ...form, paymentMethod: 'Tarjeta (Terminal)' })}
                    className={`py-4 border-2 rounded-2xl font-bold transition-all text-sm ${
                      form.paymentMethod === 'Tarjeta (Terminal)'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 opacity-50'
                    }`}
                  >
                    <i className="fas fa-credit-card mb-2 text-lg block"></i>
                    Tarjeta
                  </button>
                </div>

                {form.paymentMethod === 'Efectivo' && (
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase mb-3 tracking-wider">
                      Con cuanto pagas? (Billetes)
                    </p>
                    <div className="flex gap-2">
                      {[200, 500, 1000].map((val) => (
                        <button
                          key={val}
                          onClick={() => setForm({ ...form, changeOf: val })}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                            Number(form.changeOf) === val
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white'
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={form.changeOf}
                      onChange={(e) => setForm({ ...form, changeOf: e.target.value })}
                      placeholder="Otro monto"
                      className="w-full mt-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl py-2 px-4 outline-none border border-gray-200 dark:border-gray-700 text-sm font-medium"
                    />
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 dark:bg-black/40 p-5 rounded-3xl space-y-2.5 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>Costo de Envio</span>
                  <span className="text-orange-500 font-bold">${deliveryFee}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="font-black text-gray-800 dark:text-white tracking-widest text-xs uppercase">
                    Total a pagar
                  </span>
                  <span className="text-2xl font-black text-primary">
                    ${cartTotal + deliveryFee}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCheckoutStep(1)}
                  className="w-14 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-500 dark:text-gray-400 active:scale-95 transition-all flex items-center justify-center"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={createOrderMutation.isPending}
                  className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 active:scale-95 transition-transform uppercase text-sm tracking-widest disabled:opacity-40"
                >
                  {createOrderMutation.isPending ? (
                    <><i className="fas fa-spinner fa-spin"></i> Enviando...</>
                  ) : (
                    <><i className="fab fa-whatsapp text-2xl"></i> Enviar Pedido</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
