import React, { useState, useEffect, useRef } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './InventoryCard.css';

const InventoryCard = ({ item }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ref to clean timeout
  const timerRef = useRef(null);

  // Initialize selectedVariant when component mounts or item changes
  useEffect(() => {
    if (item?.variants?.length > 0) {
      const filtered = item.variants.filter(v => v.isFiltered);
      const initialVariant = filtered.length > 0 ? filtered[0] : item.variants[0];
      setSelectedVariant(initialVariant);
    }
  }, [item]);

  const handleVariantSelect = (variant) => {
    if (!variant || (selectedVariant && variant.id === selectedVariant.id)) return;

    setIsTransitioning(true);
    timerRef.current = setTimeout(() => {
      setSelectedVariant(variant);
      setIsTransitioning(false);
    }, 200);
  };

  // cleanup timeout when unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const currentStock = selectedVariant?.inStock ?? 0;
  const soldItems = selectedVariant?.sold ?? 0;
  const totalItems = currentStock + soldItems;

  const openLightbox = (variantIndex) => {
    setCurrentIndex(variantIndex);
    setIsOpen(true);
  };

  // fix shifting when scrollbar disappears
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lightbox-open");
    } else {
      document.body.classList.remove("lightbox-open");
    }
  }, [isOpen]);

  if (!selectedVariant) return null;

  return (
    <div className="InventoryCard">
      <div
        className="CardImgWrapper"
        onClick={() => {
          const index = item.variants.findIndex(v => v.id === selectedVariant.id);
          openLightbox(index);
        }}
        style={{ cursor: "pointer" }}
      >
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
                  onClick={(e) => {
                    e.stopPropagation(); // يمنع فتح اللايت بوكس
                    handleVariantSelect(variant);
                  }}
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

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={item.variants.map(v => ({ src: v.image }))}
        index={currentIndex}
        controller={{ closeOnBackdropClick: true }}
        // carousel={{ imageFit: "contain" }}
        carousel={{ finite: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        }}
      />
    </div>
  );
};

export default InventoryCard;
