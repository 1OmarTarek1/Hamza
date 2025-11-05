import './CardToast.css'

const CardToast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="card-toast" role="status" aria-live="polite">{message}</div>
  );
};

export default CardToast;


