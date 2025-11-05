import './InventoryCard.css'

const InventoryStats = ({ currentStock, soldItems, totalItems }) => {
  return (
    <div className="inventory-stats">
      <div className="stat">
        <span className="stat-label">المخزون</span>
        <span className={`stat-value ${currentStock < 5 ? 'low-stock' : ''}`}>
          {currentStock}
        </span>
      </div>
      <div className="stat">
        <span className="stat-label">المباع</span>
        <span className="stat-value">{soldItems}</span>
      </div>
      <div className="stat">
        <span className="stat-label">الاجمالي</span>
        <span className="stat-value">{totalItems}</span>
      </div>
    </div>
  );
};

export default InventoryStats;


