import { useState } from 'react'
import { useUIStore } from '../stores/useUIStore'
import { useAuthStore } from '../stores/useAuthStore'

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen } = useUIStore()
  const { signInWithEmail, signUpWithEmail, signInWithPhone, verifyPhoneOtp } = useAuthStore()

  const [mode, setMode] = useState('login') // login, register, phone, otp
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  if (!authModalOpen) return null

  const close = () => {
    setAuthModalOpen(false)
    setError('')
    setMode('login')
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmail(email, password)
      close()
    } catch (err) {
      setError(err.message || 'Error al iniciar sesion')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signUpWithEmail(email, password, fullName, phone)
      close()
    } catch (err) {
      setError(err.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithPhone(phone)
      setMode('otp')
    } catch (err) {
      setError(err.message || 'Error al enviar codigo')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await verifyPhoneOtp(phone, otpCode)
      close()
    } catch (err) {
      setError(err.message || 'Codigo incorrecto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bottom-sheet-overlay animate-fade-in">
      <div className="absolute inset-0" onClick={close} />
      <div className="relative w-full max-w-sm bg-white dark:bg-darkCard rounded-3xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-100 dark:border-gray-800">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-user-circle text-primary text-2xl"></i>
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {mode === 'login' && 'Iniciar Sesion'}
            {mode === 'register' && 'Crear Cuenta'}
            {mode === 'phone' && 'Acceso por Telefono'}
            {mode === 'otp' && 'Verificar Codigo'}
          </h2>
          <button onClick={close} className="absolute top-4 right-4 text-gray-400 p-1">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Rewards Notice (register mode) */}
        {mode === 'register' && (
          <div className="mx-6 mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-300 text-center">
              <i className="fas fa-star text-amber-500 mr-1.5"></i>
              Al registrarte, entraras en nuestro <strong>sistema de recompensas</strong> y recibiras
              promociones exclusivas al seguir ordenando con nosotros.
            </p>
          </div>
        )}

        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Email Login */}
          {mode === 'login' && (
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl py-3 px-4 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none text-sm font-medium"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contrasena"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl py-3 px-4 pr-11 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Iniciar Sesion'}
              </button>
            </form>
          )}

          {/* Email Register */}
          {mode === 'register' && (
            <form onSubmit={handleEmailRegister} className="space-y-3">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre completo"
                required
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl py-3 px-4 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none text-sm font-medium"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefono (opcional)"
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl py-3 px-4 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none text-sm font-medium"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl py-3 px-4 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none text-sm font-medium"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contrasena"
                  required
                  minLength={6}
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl py-3 px-4 pr-11 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Crear Cuenta'}
              </button>
            </form>
          )}

          {/* Phone Login */}
          {mode === 'phone' && (
            <form onSubmit={handlePhoneLogin} className="space-y-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+52 1 998 000 0000"
                required
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl py-3 px-4 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none text-sm font-medium"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Enviar Codigo SMS'}
              </button>
            </form>
          )}

          {/* OTP Verification */}
          {mode === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center font-medium">
                Ingresa el codigo que enviamos a {phone}
              </p>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="000000"
                required
                maxLength={6}
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl py-3 px-4 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none text-sm font-medium text-center text-xl tracking-[0.5em]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Verificar'}
              </button>
            </form>
          )}

          {/* Mode Switchers */}
          {mode !== 'otp' && (
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              {mode === 'login' && (
                <>
                  <button
                    onClick={() => { setMode('phone'); setError('') }}
                    className="w-full text-center text-xs text-gray-500 dark:text-gray-400 font-medium py-2 hover:text-primary transition-colors"
                  >
                    <i className="fas fa-phone mr-1.5"></i>
                    Acceder con numero telefonico
                  </button>
                  <button
                    onClick={() => { setMode('register'); setError('') }}
                    className="w-full text-center text-xs text-primary font-bold py-1"
                  >
                    No tienes cuenta? Registrate
                  </button>
                </>
              )}
              {mode === 'register' && (
                <button
                  onClick={() => { setMode('login'); setError('') }}
                  className="w-full text-center text-xs text-primary font-bold py-1"
                >
                  Ya tienes cuenta? Inicia sesion
                </button>
              )}
              {mode === 'phone' && (
                <button
                  onClick={() => { setMode('login'); setError('') }}
                  className="w-full text-center text-xs text-primary font-bold py-1"
                >
                  Acceder con email
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
