import React from 'react';
import { IoFilter, IoFilterOutline } from 'react-icons/io5';
import './FilterToggle.css';

const FilterToggle = ({ isOpen, onToggle }) => {
  return (
    <div className="filter-toggle-container">
      <button 
        className={`filter-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        title="فتح الفلاتر"
      >
        {isOpen ? <IoFilter /> : <IoFilterOutline />}
        {/* <span className="filter-text">الفلاتر</span> */}
      </button>
    </div>
  );
};

export default FilterToggle;
