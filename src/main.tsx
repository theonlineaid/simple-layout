import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//css
import "./index.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "simplebar-react/dist/simplebar.min.css";
// import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Context
import SettingsProvider from "./contexts/SettingsContext.tsx";
import ThemeSettings from "./com/settings/index.tsx";
import ThemeProvider from "./theme/index.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

// Component
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <ThemeSettings>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </ThemeSettings>
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>
);
