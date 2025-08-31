import React, { useState } from 'react';
import './ContactPage.css';
import { MainContainer } from '../../Components';

const ContactPage = () => {
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
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <>   
    <MainContainer>
      <div className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Get in touch with us today!</p>
          </div>
        </section>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-box">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Our Location</h3>
                <p>123 Curtain Street, Window City, WC 12345</p>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h3>Phone Number</h3>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <h3>Email Address</h3>
                <p>info@curtainsshop.com</p>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-icon">⏰</div>
              <div className="info-content">
                <h3>Working Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
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
                <label htmlFor="email">Email Address</label>
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
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
        
        <div className="map-container">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-74.005941!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
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
