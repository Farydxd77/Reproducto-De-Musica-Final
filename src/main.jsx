import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { AplicacionSemaforo } from '../src/App'

createRoot(document.getElementById('root')).render(
<StrictMode>
  <AplicacionSemaforo/>
</StrictMode>
)
