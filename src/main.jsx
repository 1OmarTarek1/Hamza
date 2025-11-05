// main.jsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import { InventoryProvider } from './Context/InventoryContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <InventoryProvider>
      <BrowserRouter basename='/Hamza'>
        <App />
      </BrowserRouter>
    </InventoryProvider>
  </ThemeProvider>
);
