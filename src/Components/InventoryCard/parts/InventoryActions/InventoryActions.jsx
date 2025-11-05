import './InventoryActions.css'

const InventoryActions = ({ onOpenForm }) => {
  return (
    <div className="inventory-actions" onClick={(e) => e.stopPropagation()}>
      <button
        className="btn supply"
        onClick={(e) => { e.stopPropagation(); onOpenForm('supply'); }}
      >
        +
      </button>
      <button
        className="btn sell"
        onClick={(e) => { e.stopPropagation(); onOpenForm('sell'); }}
      >
        -
      </button>
    </div>
  );
};

export default InventoryActions;


