import { MainContainer } from '../../Components';
import './AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <>
      <MainContainer>  
          <div className="about-us-page">
            <section className="hero-section">
              <div className="container">
                <h1 className="page-title">About Us</h1>
                <p className="page-subtitle">Discover our story and what makes us special</p>
              </div>
            </section>

            <section className="about-content">
              <div className="container">
                <div className="about-grid">
                  <div className="about-text">
                    <h2>Our Story</h2>
                    <p>
                      Founded in 2010, our curtain shop has been providing high-quality window treatments 
                      to customers who value both style and functionality. What started as a small family 
                      business has grown into a trusted name in home decor.
                    </p>
                    <p>
                      We take pride in our attention to detail and commitment to customer satisfaction. 
                      Our team of experts is dedicated to helping you find the perfect window solutions 
                      for your home or office.
                    </p>
                  </div>
                  <div className="about-image">
                    <img 
                      src="/images/about-us.jpg" 
                      alt="Our showroom" 
                      className="about-img"
                    />
                  </div>
                </div>

                <div className="features">
                  <div className="feature">
                    <div className="feature-icon">🎯</div>
                    <h3>Our Mission</h3>
                    <p>To provide exceptional window treatments that combine quality, style, and functionality.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">👁️</div>
                    <h3>Our Vision</h3>
                    <p>To be the leading provider of innovative window solutions in the region.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">💎</div>
                    <h3>Our Values</h3>
                    <p>Quality, integrity, and customer satisfaction are at the heart of everything we do.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="team-section">
              <div className="container">
                <h2>Meet Our Team</h2>
                <div className="team-grid">
                  <div className="team-member">
                    <div className="member-image"></div>
                    <h3>John Doe</h3>
                    <p>Founder & CEO</p>
                  </div>
                  <div className="team-member">
                    <div className="member-image"></div>
                    <h3>Jane Smith</h3>
                    <p>Lead Designer</p>
                  </div>
                  <div className="team-member">
                    <div className="member-image"></div>
                    <h3>Mike Johnson</h3>
                    <p>Customer Service</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
      </MainContainer>    
    </>
  );
};

export default AboutUsPage;
