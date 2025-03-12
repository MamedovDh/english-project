import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter.tsx'
import './index.sass'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
