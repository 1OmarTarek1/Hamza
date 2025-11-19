import React from 'react';
import PropTypes from 'prop-types';
import './ActiveFilters.css';

const ActiveFilters = ({ selectedColor, onClearColor, getColorName }) => {
  if (selectedColor === 'all') return null;

  return (
    <div className="active-filters">
      <div className="active-filter">
        <span>اللون المحدد: {getColorName(selectedColor)}</span>
        <button
          onClick={onClearColor}
          className="clear-filter"
          aria-label="Clear color filter"
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

ActiveFilters.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  onClearColor: PropTypes.func.isRequired,
  getColorName: PropTypes.func.isRequired,
};

export default ActiveFilters;
