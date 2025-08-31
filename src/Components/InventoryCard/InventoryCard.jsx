import React, { useState, useEffect } from 'react';
import './InventoryCard.css';

const InventoryCard = ({ item }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize selectedVariant when component mounts or item changes
  useEffect(() => {
    if (item?.variants?.length > 0) {
      // If there's a filtered variant, select it, otherwise select the first variant
      const filtered = item.variants.filter(v => v.isFiltered);
      const initialVariant = filtered.length > 0 ? filtered[0] : item.variants[0];
      setSelectedVariant(initialVariant);
    }
  }, [item]);

  const handleVariantSelect = (variant) => {
    if (!variant || (selectedVariant && variant.id === selectedVariant.id)) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedVariant(variant);
      setIsTransitioning(false);
    }, 200);
  };

  if (!selectedVariant) return null;

  // Check if the current selected variant matches the filter
  const isSelectedVariantFiltered = selectedVariant.isFiltered !== false;

  // Current stock is what's physically available
  const currentStock = selectedVariant.inStock;
  // Sold items are already tracked
  const soldItems = selectedVariant.sold;
  // Total is the sum of current stock + sold items
  const totalItems = currentStock + soldItems;

  return (
    <div className="InventoryCard">
      <div className="CardImgWrapper">
        <img 
          src={selectedVariant.image} 
          alt={`${item.name} - ${selectedVariant.name}`}
          className={`card-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          loading="lazy"
        />
        <div className="imgContent">
          <div className="type">{item.type}</div>
          <h3 className="shapeName">{item.name}</h3>
          <div className="color-name">{selectedVariant.name}</div>
          <div className="color-options">
            {item.variants.map((variant) => {
              const isActive = selectedVariant.id === variant.id;
              const isFiltered = variant.isFiltered !== false;
              
              return (
                <button
                  key={variant.id}
                  className={`color-swatch ${isActive ? 'active' : ''} ${!isFiltered ? 'not-filtered' : ''}`}
                  style={{ backgroundColor: variant.code }}
                  onClick={() => handleVariantSelect(variant)}
                  title={variant.name}
                  aria-pressed={isActive}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="card-content">
        
        <div className="inventory-info">
          <div className="inventory-stats">
            <div className="stat">
              <span className="stat-label">المخزون</span>
              <span className={`stat-value ${currentStock < 5 ? 'low-stock' : ''}`}>
                {currentStock}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">المباع</span>
              <span className="stat-value">{soldItems}</span>
            </div>
            <div className="stat">
              <span className="stat-label">الاجمالي</span>
              <span className="stat-value">{totalItems}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
