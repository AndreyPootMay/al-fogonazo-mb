import { useEffect, useRef } from 'react'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

export default function TurnstileWidget({ onVerify }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)

  useEffect(() => {
    if (!window.turnstile || !containerRef.current) return

    // Clean up previous widget
    if (widgetIdRef.current !== null) {
      window.turnstile.remove(widgetIdRef.current)
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      callback: (token) => onVerify(token),
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      size: 'normal',
    })

    return () => {
      if (widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // Widget may already be removed
        }
      }
    }
  }, [onVerify])

  return <div ref={containerRef} className="flex justify-center my-3" />
}
