import './SalesTable.css';

const SalesTable = ({ sales, onEdit, onDelete }) => {
  if (sales.length === 0) {
    return (
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>م</th>
              <th>اسم المشتري</th>
              <th>رقم الهاتف</th>
              <th>الكمية</th>
              <th>النوع</th>
              <th>الشكل</th>
              <th>اللون</th>
              <th>التاريخ</th>
              <th>الوقت</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={10} style={{ textAlign: 'center', padding: '16px' }}>
                لا توجد مبيعات بعد
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>م</th>
            <th>اسم المشتري</th>
            <th>رقم الهاتف</th>
            <th>الكمية</th>
            <th>النوع</th>
            <th>الشكل</th>
            <th>اللون</th>
            <th>التاريخ</th>
            <th>الوقت</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale.id}>
              <td>{index + 1}</td>
              <td className="name-cell">{sale.buyerName}</td>
              <td>{sale.buyerPhone || '-'}</td>
              <td>{sale.quantity}</td>
              <td>{sale.product.typeName}</td>
              <td>{sale.product.shapeName}</td>
              <td>
                <span 
                  className="color-dot" 
                  style={{ backgroundColor: sale.product.colorCode }} 
                /> 
                {sale.product.colorName}
              </td>
              <td>{new Date(sale.createdAt).toLocaleDateString('en-GB')}</td>
              <td>{new Date(sale.createdAt).toLocaleTimeString()}</td>
              <td>
                <button 
                  className="btn edit" 
                  onClick={() => onEdit(sale)}
                >
                  تعديل
                </button>
                <button 
                  className="btn delete" 
                  onClick={() => onDelete(sale)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
          {/* Total Row */}
          <tr className="total-row">
            <td colSpan="3" style={{ textAlign: 'left', padding: '8px 16px', fontWeight: 'bold' }}>المجموع</td>
            <td style={{ fontWeight: 'bold' }}>
              {sales.reduce((sum, sale) => sum + (parseInt(sale.quantity) || 0), 0)}
            </td>
            <td colSpan="6"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
