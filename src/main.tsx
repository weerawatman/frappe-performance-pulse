
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/toaster'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
