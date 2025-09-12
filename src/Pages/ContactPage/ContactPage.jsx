import React, { useState } from 'react';
import './ContactPage.css';
import { MainContainer } from '../../Components';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>   
    <MainContainer>
      <div className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <h1>{t('contact.title')}</h1>
            <p>{t('contact.subtitle')}</p>
          </div>
        </section>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-box">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>{t('contact.location')}</h3>
                <p>شارع الستائر 123، مدينة النوافذ</p>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h3>{t('contact.phone')}</h3>
                <p>+20 100 000 0000</p>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <h3>{t('contact.email')}</h3>
                <p>info@curtainsshop.com</p>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-icon">⏰</div>
              <div className="info-content">
                <h3>{t('contact.hours')}</h3>
                <p>{t('contact.hours_week')}</p>
                <p>{t('contact.hours_fri')}</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>{t('contact.form_title')}</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">{t('contact.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('contact.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{t('contact.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{t('contact.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">{t('contact.send')}</button>
            </form>
          </div>
        </div>
        
        <div className="map-container">
          <iframe
            title="موقعنا على الخريطة"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-74.005941!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sar!2seg!4v1234567890123!5m2!1sar!2seg"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </MainContainer>
    </>
  );
};

export default ContactPage;
