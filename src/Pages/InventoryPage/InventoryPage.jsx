import { useState, useEffect, useRef } from 'react';
import { MainContainer, InventoryCard, ColorFilter, TypeFilter, SpotlightCard } from '../../Components';
import { getColorName } from '../../utils/colorUtils';
import curtainTypes from '../../Data/inventoryData';
import './InventoryPage.css';

const InventoryPage = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  // 🔹 يقفل الفلتر لما تضغط برا
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get all unique colors from the data
  const allColors = [...new Set(
    curtainTypes.flatMap(type => 
      type.shapes.flatMap(shape => 
        shape.variants.map(v => ({
          code: v.code,
          name: v.name || getColorName(v.code)
        }))
      )
    )
  )].filter((color, index, self) => 
    index === self.findIndex(c => c.code.toLowerCase() === color.code.toLowerCase())
  );

  // Filter items based on selected type and color
  const filteredTypes = curtainTypes
    .filter(type => selectedType === 'all' || type.id === selectedType)
    .map(type => {
      const filteredShapes = type.shapes.filter(shape => {
        return selectedColor === 'all' || 
          shape.variants.some(v => v.code === selectedColor);
      });

      if (filteredShapes.length === 0) return null;

      return {
        ...type,
        shapes: filteredShapes.map(shape => ({
          ...shape,
          variants: shape.variants.map(variant => ({
            ...variant,
            isFiltered: selectedColor === 'all' || variant.code === selectedColor
          }))
        }))
      };
    })
    .filter(Boolean);

  return (
    <div className="InventoryPage">
      <MainContainer>
        <div 
          ref={filterRef} 
          className={`filterGroup ${isFilterOpen ? 'open' : ''}`}
        >
          <button 
            className="toggle-filter-btn" 
            onClick={() => setIsFilterOpen(prev => !prev)}
          >
            {isFilterOpen ? '✖' : '☰'}
          </button>
          <div className="filter-row">
            <TypeFilter
              types={curtainTypes}
              selectedType={selectedType}
              onTypeSelect={setSelectedType}
            />
            
            <ColorFilter
              colors={allColors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              getColorName={getColorName}
            />
          </div>
        </div>

        <div className="inventory-container">
          {filteredTypes.length > 0 ? (
            filteredTypes.map(type => (
              <div key={type.id} className="type-section">
                <h2 className="type-title">{type.name}</h2>
                <div className="shapes-grid">
                  {type.shapes.map(shape => (
                    <div key={shape.id} className="card-spotlight">
                      <SpotlightCard>
                        <InventoryCard 
                          item={{
                            ...shape,
                            type: type.name
                          }} 
                        />
                      </SpotlightCard>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>لا توجد نتائج مطابقة للفلاتر المحددة</p>
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedType('all');
                  setSelectedColor('all');
                }}
              >
                مسح كل الفلاتر
              </button>
            </div>
          )}
        </div>
      </MainContainer>
    </div>
  );
};

export default InventoryPage;
