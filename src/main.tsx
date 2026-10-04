import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import { MenuPage } from './pages/MenuPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" desliga animações de movimento para quem pediu prefers-reduced-motion */}
    <MotionConfig reducedMotion="user">
      <MenuPage />
    </MotionConfig>
  </StrictMode>,
)
