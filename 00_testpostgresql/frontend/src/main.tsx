import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import './index.css'
import App from './App.tsx'

// Use reCAPTCHA v3 provider. The key here should be the v3 site key (public).
createRoot(document.getElementById('root')!).render(
  <GoogleReCaptchaProvider reCaptchaKey="6LdsFRosAAAAAOPKEvCFQg06PmY7tXOyVgByvYiW">
    <App />
  </GoogleReCaptchaProvider>
)