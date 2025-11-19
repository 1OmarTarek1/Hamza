import { MainContainer } from '../../Components';
import { Category, HomeHeader } from '../../Sections';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homePage">
      <HomeHeader />
      <MainContainer>
        <Category />
      </MainContainer>
    </div>
  );
};

export default HomePage;
