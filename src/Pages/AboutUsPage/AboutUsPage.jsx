import { MainContainer } from '../../Components';
import './AboutUsPage.css';
import { useTranslation } from 'react-i18next';

const AboutUsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <MainContainer>  
          <div className="about-us-page">
            <section className="hero-section">
              <div className="container">
                <h1 className="page-title">{t('about.title')}</h1>
                <p className="page-subtitle">{t('about.subtitle')}</p>
              </div>
            </section>

            <section className="about-content">
              <div className="container">
                <div className="about-grid">
                  <div className="about-text">
                    <h2>{t('about.ourStory')}</h2>
                    <p>
                      {t('about.storyP1')}
                    </p>
                    <p>
                      {t('about.storyP2')}
                    </p>
                  </div>
                  <div className="about-image">
                    <img 
                      src="/images/about-us.jpg" 
                      alt="معرضنا" 
                      className="about-img"
                    />
                  </div>
                </div>

                <div className="features">
                  <div className="feature">
                    <div className="feature-icon">🎯</div>
                    <h3>{t('about.mission')}</h3>
                    <p>{t('about.missionText')}</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">👁️</div>
                    <h3>{t('about.vision')}</h3>
                    <p>{t('about.visionText')}</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">💎</div>
                    <h3>{t('about.values')}</h3>
                    <p>{t('about.valuesText')}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="team-section">
              <div className="container">
                <h2>{t('about.team')}</h2>
                <div className="team-grid">
                  <div className="team-member">
                    <div className="member-image"></div>
                    <h3>{t('about.member1')}</h3>
                    <p>{t('about.member1Role')}</p>
                  </div>
                  <div className="team-member">
                    <div className="member-image"></div>
                    <h3>{t('about.member2')}</h3>
                    <p>{t('about.member2Role')}</p>
                  </div>
                  <div className="team-member">
                    <div className="member-image"></div>
                    <h3>{t('about.member3')}</h3>
                    <p>{t('about.member3Role')}</p>
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
