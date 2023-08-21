import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Header from './components/Header'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>
)
