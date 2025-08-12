import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './contex/ContextShare.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <StrictMode>
      <ContextShare><App /></ContextShare>
    </StrictMode>
 </BrowserRouter>
)
