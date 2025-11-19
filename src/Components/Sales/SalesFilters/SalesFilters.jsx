import './SalesFilters.css';

const SalesFilters = ({
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
    <div className="filters">
      <div className="filter-row">
        <div className="filter-col">
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
        <div className="filter-col">
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
        <div className="filter-col">
          {/* <label htmlFor="min-qty">الكمية من</label> */}
          <input 
            id="min-qty"
            name="minQty"
            type="number" 
            placeholder='الكمية من'
            min="0" 
            value={minQty} 
            onChange={e => setMinQty(e.target.value)} 
          />
        </div>
        <div className="filter-col">
          {/* <label htmlFor="max-qty">الكمية إلى</label> */}
          <input 
            id="max-qty"
            name="maxQty"
            type="number" 
            placeholder='الكمية الي'
            min="0" 
            value={maxQty} 
            onChange={e => setMaxQty(e.target.value)} 
          />
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-col">
          {/* <label htmlFor="type-filter">النوع</label> */}
          <select id="type-filter" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">جميع الانواع</option>
            {typeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="filter-col">
          {/* <label htmlFor="shape-filter">الشكل</label> */}
          <select id="shape-filter" value={shapeFilter} onChange={e => setShapeFilter(e.target.value)}>
            <option value="all">جميع الاشكال</option>
            {shapeOptions.map(shape => (
              <option key={shape} value={shape}>{shape}</option>
            ))}
          </select>
        </div>
        <div className="filter-col">
          {/* <label htmlFor="color-filter">اللون</label> */}
          <select id="color-filter" value={colorFilter} onChange={e => setColorFilter(e.target.value)}>
            <option value="all">جميع الالوان</option>
            {colorOptions.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-col">
          <label htmlFor="from-date">من</label>
          <input 
            id="from-date"
            name="fromDate"
            type="date" 
            value={fromDate} 
            onChange={e => setFromDate(e.target.value)} 
          />
        </div>
        <div className="filter-col">
          <label htmlFor="to-date">إلى</label>
          <input 
            id="to-date"
            name="toDate"
            type="date" 
            value={toDate} 
            onChange={e => setToDate(e.target.value)} 
          />
        </div>
        <div className="filter-col">
          {/* <label htmlFor="date-sort">ترتيب حسب التاريخ</label> */}
          <select id="date-sort" value={dateSort} onChange={e => setDateSort(e.target.value)}>
            <option value="desc">الأحدث ← الأقدم</option>
            <option value="asc">الأقدم ← الأحدث</option>
          </select>
        </div>
        <div className="filter-actions">
          <button className="btn clear" onClick={clearFilters}>
            مسح الفلاتر
          </button>
          <div className="results-count">النتائج: {resultsCount}</div>
        </div>
      </div>
    </div>
  );
};

export default SalesFilters;
