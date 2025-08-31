import { useState, useEffect } from 'react';
import { GalleryItems, MainContainer } from '../../Components';
import { GalleryItemsData } from '../../Data/GalleryItemsData';
import './GalleryPage.css';

const GalleryPage = () => {
  const [filteredItems, setFilteredItems] = useState(GalleryItemsData);

  useEffect(() => {
    // Initialize filtered items on mount (optional)
    setFilteredItems(GalleryItemsData);
  }, []);

  return (
    <>
      <MainContainer>    
          <div className="GalleryPage">
            <h1 className="galleryTitle">معرض الصور</h1>
            <GalleryItems 
              items={filteredItems} 
              shuffle={false} 
              slice={false}
            />
          </div>
      </MainContainer>    
    </>
  );
};

export default GalleryPage;
