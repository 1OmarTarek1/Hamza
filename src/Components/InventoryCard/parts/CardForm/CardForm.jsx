import './CardForm.css'

const CardForm = ({
  item,
  selectedVariant,
  formMode,
  quantity,
  buyerName,
  buyerPhone,
  error,
  onChangeQuantity,
  onChangeBuyerName,
  onChangeBuyerPhone,
  onSubmit,
  onClose,
  currentStock,
}) => {
  return (
    <form className="card-form" onSubmit={onSubmit}>
      <div className="form-header">
        <div>{formMode === 'supply' ? 'توريد للمخزون' : 'بيع منتج'}</div>
        {/* <button type="button" className="close-btn" onClick={onClose}>×</button> */}
      </div>

      <div className="form-summary">
        <div className='form-summary-item'>
          <span className='form-summary-item-label' id="type-label">النوع</span> 
          <span className='form-summary-item-value' aria-labelledby="type-label">{item.typeName}</span>
        </div>
        <div className='form-summary-item'>
          <span className='form-summary-item-label' id="shape-label">الشكل</span> 
          <span className='form-summary-item-value' aria-labelledby="shape-label">{item.name}</span>
        </div>
        <div className='form-summary-item'>
          <span className='form-summary-item-label' id="color-label">اللون</span> 
          <span className='form-summary-item-value' aria-labelledby="color-label">{selectedVariant.name}</span>
        </div>
        <div className='form-summary-item'>
          <span className='form-summary-item-label' id="stock-label">المخزون</span> 
          <span className='form-summary-item-value' aria-labelledby="stock-label">{currentStock}</span>
        </div>
      </div>

      <div className="form-row">
        {/* <label htmlFor="qty-input" className="sr-only">الكمية</label> */}
        <input
          id="qty-input"
          name="quantity"
          type="number"
          aria-label="الكمية"
          placeholder="الكمية"
          min={1}
          max={formMode === 'sell' ? currentStock : undefined}
          value={quantity}
          onChange={(e) => onChangeQuantity(e.target.value)}
          required
        />
      </div>

      {formMode === 'sell' && (
        <>
          <div className="form-row">
            {/* <label htmlFor="buyer-name" className="sr-only">اسم المشتري</label> */}
            <input
              id="buyer-name"
              name="buyerName"
              type="text"
              aria-label="اسم المشتري"
              placeholder="اسم المشتري"
              value={buyerName}
              onChange={(e) => onChangeBuyerName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            {/* <label htmlFor="buyer-phone" className="sr-only">رقم الهاتف</label> */}
            <input
              id="buyer-phone"
              name="buyerPhone"
              type="tel"
              aria-label="رقم الهاتف"
              placeholder="رقم الهاتف"
              value={buyerPhone}
              onChange={(e) => onChangeBuyerPhone(e.target.value)}
              required
            />
          </div>
        </>
      )}

      {error && <div className="error-text">{error}</div>}

      <div className="form-actions">
        <button type="button" className="btn secondary" onClick={onClose}>إلغاء</button>
        <button type="submit" className="btn primary">{formMode === 'supply' ? 'إضافة للمخزون' : 'تأكيد البيع'}</button>
      </div>
    </form>
  );
};

export default CardForm;
