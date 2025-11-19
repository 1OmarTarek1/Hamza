import React from 'react';
import { IoFilter, IoClose } from 'react-icons/io5';
import './SalesSidebar.css';

const SalesSidebar = ({
  isOpen,
  onClose,
  // Filter values
  nameQuery,
  phoneQuery,
  minQty,
  maxQty,
  typeFilter,
  shapeFilter,
  colorFilter,
  fromDate,
  toDate,
  dateSort,
  
  // Filter options
  typeOptions,
  shapeOptions,
  colorOptions,
  
  // Filter setters
  setNameQuery,
  setPhoneQuery,
  setMinQty,
  setMaxQty,
  setTypeFilter,
  setShapeFilter,
  setColorFilter,
  setFromDate,
  setToDate,
  setDateSort,
  
  // Actions
  clearFilters,
  resultsCount
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      {/* Sidebar */}
      <div className={`sales-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-title">
            <IoFilter className="filter-icon" />
            <span>فلترة النتائج</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        {/* Content */}
        <div className="sidebar-content">
          {/* Search by Name */}
          <div className="filter-group">
            {/* <label htmlFor="buyer-name-filter">اسم المشتري</label> */}
            <input 
              id="buyer-name-filter"
              type="text" 
              name="buyerName"
              value={nameQuery} 
              onChange={e => setNameQuery(e.target.value)} 
              placeholder="ابحث بالاسم" 
            />
          </div>

          {/* Search by Phone */}
          <div className="filter-group">
            {/* <label htmlFor="phone-filter">رقم الهاتف</label> */}
            <input 
              id="phone-filter"
              type="tel" 
              name="phone"
              value={phoneQuery} 
              onChange={e => setPhoneQuery(e.target.value)} 
              placeholder="ابحث برقم الهاتف" 
              autoComplete='auto'
            />
          </div>

          {/* Quantity Range */}
          <div className="filter-group">
            {/* <label>نطاق الكمية</label> */}
            <div className="range-inputs">
              <input 
                id="min-qty"
                name="minQty"
                type="number" 
                placeholder='من كمية'
                min="0" 
                value={minQty} 
                onChange={e => setMinQty(e.target.value)} 
              />
              {/* <span className="range-separator">-</span> */}
              <input 
                id="max-qty"
                name="maxQty"
                type="number" 
                placeholder='إلى كمية'
                min="0" 
                value={maxQty} 
                onChange={e => setMaxQty(e.target.value)} 
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="filter-group">
            {/* <label htmlFor="type-filter">النوع</label> */}
            <select id="type-filter" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="all">جميع الانواع</option>
              {typeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Shape Filter */}
          <div className="filter-group">
            {/* <label htmlFor="shape-filter">الشكل</label> */}
            <select id="shape-filter" value={shapeFilter} onChange={e => setShapeFilter(e.target.value)}>
              <option value="all">جميع الاشكال</option>
              {shapeOptions.map(shape => (
                <option key={shape} value={shape}>{shape}</option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div className="filter-group">
            {/* <label htmlFor="color-filter">اللون</label> */}
            <select id="color-filter" value={colorFilter} onChange={e => setColorFilter(e.target.value)}>
              <option value="all">جميع الالوان</option>
              {colorOptions.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="filter-group">
            {/* <label>نطاق التاريخ</label> */}
            <div className="date-inputs">
              <div className="date-input">
                {/* <label htmlFor="from-date">من</label> */}
                <input 
                  id="from-date"
                  name="fromDate"
                  type="date" 
                  value={fromDate} 
                  onChange={e => setFromDate(e.target.value)} 
                />
              </div>
              <div className="date-input">
                {/* <label htmlFor="to-date">إلى</label> */}
                <input 
                  id="to-date"
                  name="toDate"
                  type="date" 
                  value={toDate} 
                  onChange={e => setToDate(e.target.value)} 
                />
              </div>
            </div>
          </div>

          {/* Date Sort */}
          <div className="filter-group">
            {/* <label htmlFor="date-sort">ترتيب حسب التاريخ</label> */}
            <select id="date-sort" value={dateSort} onChange={e => setDateSort(e.target.value)}>
              <option value="desc">الأحدث ← الأقدم</option>
              <option value="asc">الأقدم ← الأحدث</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="results-info">
            <div className="results-count">
              <span className="count-text">النتائج : </span>
              <span className="count-number">{resultsCount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="btn clear-btn" onClick={clearFilters}>
            تنظيف الفلاتر
          </button>
        </div>
      </div>
    </>
  );
};

export default SalesSidebar;
