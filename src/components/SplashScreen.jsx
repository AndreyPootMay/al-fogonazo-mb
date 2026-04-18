import { useEffect, useState } from 'react'

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onFinish()
    }, 1800)
    return () => clearTimeout(timer)
  }, [onFinish])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center">
      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse">
        <i className="fas fa-fire text-white text-4xl"></i>
      </div>
      <h1 className="mt-6 text-white text-2xl font-bold tracking-widest uppercase">
        AL FOGONAZO
      </h1>
      <p className="mt-2 text-gray-500 text-xs tracking-wider">Pollo asado y carnes al carbon</p>
    </div>
  )
}
