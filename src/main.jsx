// main.jsx
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './i18n';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { LanguageProvider } from './Context';
import { ThemeProvider } from './Context/ThemeContext';
import { InventoryProvider } from './Context/InventoryContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n}>
    <LanguageProvider>
      <ThemeProvider>
        <InventoryProvider>
          <BrowserRouter basename='/Hamza'>
            <App />
          </BrowserRouter>
        </InventoryProvider>
      </ThemeProvider>
    </LanguageProvider>
  </I18nextProvider>
);
