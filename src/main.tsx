import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import AppProviders from "./contexts/AppProviders.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter
    // basename={process.env.PUBLIC_URL}
  >
    <AppProviders>
      <App />
    </AppProviders>
  </BrowserRouter>
)
