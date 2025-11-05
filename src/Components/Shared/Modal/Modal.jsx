import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className={`modal ${className}`} onClick={handleModalClick}>
        <div className="modal-header" onClick={handleModalClick}>
          <h3>{title}</h3>
          <button 
            className="close-btn" 
            onClick={onClose} 
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
