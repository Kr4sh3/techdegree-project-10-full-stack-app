import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css';
import './global.css';
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
        <App />
    </UserProvider>
  </StrictMode>,
)
