import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import "ag-grid-community/styles/ag-theme-balham.css";
// import "ag-grid-community/styles/ag-theme-material.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import 'simplebar-react/dist/simplebar.min.css';
import SettingsProvider from './contexts/SettingsContext.tsx'
import ThemeSettings from './com/settings/index.tsx'
import 'simplebar-react/dist/simplebar.min.css';
import ThemeProvider from './theme/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <ThemeSettings>
          <App />
        </ThemeSettings>
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>,
)
