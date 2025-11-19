import React from 'react';
import Modal from '../../Shared/Modal/Modal';
import './EditSaleModal.css';

const EditSaleModal = ({
  isOpen,
  onClose,
  sale,
  editQty,
  editName,
  editPhone,
  editError,
  setEditQty,
  setEditName,
  setEditPhone,
  onSubmit
}) => {
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  if (!sale) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تعديل عملية البيع"
      className="edit-sale-modal"
    >
      <form onSubmit={onSubmit} className="form" onClick={handleFormClick}>
        <div className="form-summary">
          <div><strong>النوع:</strong> {sale.product?.typeName}</div>
          <div><strong>الشكل:</strong> {sale.product?.shapeName}</div>
          <div><strong>اللون:</strong> {sale.product?.colorName}</div>
        </div>

        <label className="form-row" htmlFor="edit-qty">
          <span>الكمية</span>
          <input 
            id="edit-qty" 
            type="number" 
            min={1} 
            value={editQty} 
            onChange={e => setEditQty(e.target.value)} 
            required 
          />
        </label>

        <label className="form-row" htmlFor="edit-name">
          <span>اسم المشتري</span>
          <input 
            id="edit-name" 
            type="text" 
            value={editName} 
            onChange={e => setEditName(e.target.value)} 
            required 
          />
        </label>

        <label className="form-row" htmlFor="edit-phone">
          <span>رقم الهاتف</span>
          <input 
            id="edit-phone" 
            type="tel" 
            value={editPhone} 
            onChange={e => setEditPhone(e.target.value)} 
          />
        </label>

        {editError && <div className="error-text">{editError}</div>}

        <div className="actions">
          <button 
            type="button" 
            className="btn secondary" 
            onClick={onClose}
          >
            إلغاء
          </button>
          <button 
            type="submit" 
            className="btn primary"
            onClick={(e) => e.stopPropagation()}
          >
            حفظ
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditSaleModal;
