import React from 'react';
import PropTypes from 'prop-types';
import './ColorFilter.css';

const ColorFilter = ({ colors, selectedColor, onColorSelect, getColorName }) => {
  const handleClick = (color) => {
    onColorSelect(color);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="colorFilter">
      <div className="color-options">
        {colors.map((color) => (
          <button
            key={color.code}
            className={`color-swatch ${selectedColor === color.code ? 'active' : ''}`}
            style={{ backgroundColor: color.code }}
            onClick={() => handleClick(color.code)}
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
