import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3 className="footer-title">{t('footer.aboutUs', 'About Us')}</h3>
            <p className="footer-text">
              {t('footer.aboutText', 'Your trusted source for high-quality curtains and window treatments.')}
            </p>
          </div>

          <div className="footer-section links">
            <h3 className="footer-title">{t('footer.quickLinks', 'Quick Links')}</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">{t('navbar.home')}</Link></li>
              <li><Link to="/aboutPage" className="footer-link">{t('navbar.about')}</Link></li>
              <li><Link to="/productsPage" className="footer-link">{t('navbar.products', 'Products')}</Link></li>
              <li><Link to="/contactPage" className="footer-link">{t('navbar.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3 className="footer-title">{t('footer.contactUs', 'Contact Us')}</h3>
            <div className="contact-info">
              <p className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@curtainsshop.com</span>
              </p>
              <p className="contact-item">
                <i className="fas fa-phone"></i>
                <span>(123) 456-7890</span>
              </p>
              <p className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Curtain St, Window City</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            {t('footer.copyright', { year: currentYear, defaultValue: ' All Rights Reserved' })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
