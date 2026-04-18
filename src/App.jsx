import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SplashScreen from './components/SplashScreen'
import HomePage from './pages/HomePage'
import RewardsPage from './pages/RewardsPage'
import PoliciesPage from './pages/PoliciesPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  const handleSplashFinish = useCallback(() => {
    setSplashDone(true)
  }, [])

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
      {splashDone && (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recompensas" element={<RewardsPage />} />
            <Route path="/politicas" element={<PoliciesPage />} />
            <Route path="/privacidad" element={<PrivacyPage />} />
            <Route path="/terminos" element={<TermsPage />} />
          </Routes>
        </Layout>
      )}
    </>
  )
}
