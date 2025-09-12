import React, { useEffect, useRef } from 'react';
import './Toast.css';

const Toast = ({ message, duration = 2200, onClose }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (message) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onClose?.();
      }, duration);
    }

    return () => clearTimeout(timerRef.current);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
};

export default Toast;
