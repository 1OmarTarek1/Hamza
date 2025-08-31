import React from 'react';
import PropTypes from 'prop-types';
import './ColorFilter.css';

const ColorFilter = ({ colors, selectedColor, onColorSelect, getColorName }) => {
  return (
    <div className="colorFilter">
      <div className="color-options">
        {/* <button
          className={`color-swatch ${selectedColor === 'all' ? 'active' : ''}`}
          style={{ background: 'transparent' }}
          onClick={() => onColorSelect('all')}
          aria-label="عرض كل الألوان"
          type="button"
        >
          <span>الكل</span>
        </button> */}
        {colors.map((color) => (
          <button
            key={color.code}
            className={`color-swatch ${selectedColor === color.code ? 'active' : ''}`}
            style={{ backgroundColor: color.code }}
            onClick={() => onColorSelect(color.code)}
            aria-label={color.name || `لون ${color.code}`}
            title={color.name || ''}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

ColorFilter.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
  selectedColor: PropTypes.string.isRequired,
  onColorSelect: PropTypes.func.isRequired,
  getColorName: PropTypes.func.isRequired,
};

export default ColorFilter;
