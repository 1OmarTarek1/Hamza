import { useState, useEffect, useRef, useMemo } from 'react';
import { MainContainer, InventoryCard, ColorFilter, TypeFilter, SpotlightCard } from '../../Components';
import { getColorName } from '../../utils/colorUtils';
import { useInventory } from '../../Context/InventoryContext';
import './InventoryPage.css';

const InventoryPage = () => {
  const { inventory } = useInventory();
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
  const allColors = useMemo(() => {
    const colors = inventory.flatMap(type => 
      (type.shapes || []).flatMap(shape => 
        (shape.variants || []).map(v => ({
          code: v.code,
          name: v.name || getColorName(v.code)
        }))
      )
    );
    const unique = colors.filter((color, index, self) => 
      index === self.findIndex(c => c.code.toLowerCase() === color.code.toLowerCase())
    );
    return unique;
  }, [inventory]);

  // Filter items based on selected type and color
  const filteredTypes = useMemo(() => {
    const base = selectedType === 'all' ? inventory : inventory.filter(t => t.id === selectedType);
    const mapped = base.map(type => {
      const filteredShapes = (type.shapes || []).filter(shape => {
        return selectedColor === 'all' || shape.variants.some(v => v.code === selectedColor);
      });
      if (filteredShapes.length === 0) return null;
      return {
        ...type,
        shapes: filteredShapes.map(shape => ({
          ...shape,
          // Mark variants that match color
          variants: (shape.variants || []).map(variant => ({
            ...variant,
            isFiltered: selectedColor === 'all' || variant.code === selectedColor
          }))
        }))
      };
    }).filter(Boolean);
    return mapped;
  }, [inventory, selectedType, selectedColor]);

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
              types={inventory}
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
                            type: type.name,
                            typeId: type.id,
                            typeName: type.name,
                            shapeId: shape.id,
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
