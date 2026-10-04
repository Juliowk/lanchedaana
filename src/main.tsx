import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import './index.css'
import { MenuPage } from './pages/MenuPage'
import { AdminPage } from './pages/AdminPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" desliga animações de movimento para quem pediu prefers-reduced-motion */}
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<MenuPage />} />
        </Routes>
      </HashRouter>
    </MotionConfig>
  </StrictMode>,
)
