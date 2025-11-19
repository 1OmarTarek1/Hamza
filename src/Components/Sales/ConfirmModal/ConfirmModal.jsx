import React from 'react';
import Modal from '../../Shared/Modal/Modal';
import './ConfirmModal.css';

const ConfirmModal = ({
  isOpen,
  onClose,
  message,
  onConfirm,
  confirmText = "تأكيد",
  cancelText = "إلغاء"
}) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    onConfirm();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تأكيد"
      className="confirm-modal"
    >
      <div className="confirm-content" onClick={handleContentClick}>
        <p className="confirm-message">{message}</p>
        <div className="actions">
          <button 
            type="button"
            className="btn secondary" 
            onClick={handleClose}
          >
            {cancelText}
          </button>
          <button 
            type="button"
            className="btn primary" 
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
