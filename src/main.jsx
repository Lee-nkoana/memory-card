import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './components.css'

import App from './App.jsx'
import { Header, Cards } from './components.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cards />
  </StrictMode>,
)
