import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'

import App from './App'
import { queryCLient } from './config'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryCLient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
