import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import {Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster toastOptions={{
        success: {
          style: {
            background: "#fff",
            color: "#0EA5E9",
            border: "1px solid #bae6fd",
          },
          iconTheme: {
            primary: "#0EA5E9",
            secondary: "#fff",
          },
        },
        error: {
          style: {
            background: "#fff",
            color: "#ef4444",
            border: "1px solid #fecaca",
          },
        },
      }} position="top-center" />
    </BrowserRouter>

  </StrictMode>,
)
