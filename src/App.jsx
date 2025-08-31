import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Footer } from "./layouts";
import { AppRoutes } from "./routes";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ScrollToTop, ToTopBtn } from './Components';
import './App.css';


const App = () => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    AOS.init({
      duration: 800, // مدة الانيميشن بالملي ثانية
    });
  }, []);

  useEffect(() => {
    // اتجاه النص
    document.body.dir = i18n.dir();

    // class rtl/ltr
    document.body.className = i18n.language === 'ar' ? 'rtl' : 'ltr';

    // تحديد اللغة على الـ <html>
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <div className={`app ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
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
