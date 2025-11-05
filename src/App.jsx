import { useEffect } from 'react';
import { Navbar, Footer } from "./layouts";
import { AppRoutes } from "./routes";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ScrollToTop, ToTopBtn } from './Components';
import './App.css';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
    
    // Set RTL for Arabic
    document.body.dir = 'rtl';
    document.body.className = 'rtl';
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.body.style.fontFamily = 'Tajawal, sans-serif';
  }, []);

  return (
    <>
      <div className="app rtl">
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      <ToTopBtn />
    </>
  );
};

export default App;
