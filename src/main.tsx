import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SingleCard from "./singlecard/SingleCard.tsx";

function routeApp() {
  if (document.location.pathname.startsWith('/singlecard/')) {
    return <SingleCard cardRef={document.location.pathname.substring(12)} />
  } else if (document.location.pathname === '/') {
    return <App />
  } else {
    window.location.replace(document.location.protocol + "//" + document.location.host)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {routeApp()}
  </StrictMode>,
)
