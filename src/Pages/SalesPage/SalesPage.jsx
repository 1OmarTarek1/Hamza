import React, { useMemo, useState, useRef } from 'react';
import { 
  MainContainer, 
  Toast, 
  SalesSidebar, 
  FilterToggle, 
  SalesTable, 
  EditSaleModal, 
  ConfirmModal,
  SalesCharts
} from '../../Components';
import { useInventory } from '../../Context/InventoryContext';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { MdFilterListOff } from 'react-icons/md';
import './SalesPage.css';

const SalesPage = () => {
	const { sales, updateSale, deleteSale } = useInventory();
	
	// Sidebar state
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Filters state
	const [nameQuery, setNameQuery] = useState('');
	const [phoneQuery, setPhoneQuery] = useState('');
	const [minQty, setMinQty] = useState('');
	const [maxQty, setMaxQty] = useState('');
	const [typeFilter, setTypeFilter] = useState('all');
	const [shapeFilter, setShapeFilter] = useState('all');
	const [colorFilter, setColorFilter] = useState('all');
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [dateSort, setDateSort] = useState('desc'); // 'desc' newest→oldest | 'asc' oldest→newest

	// Edit modal state
	const [editOpen, setEditOpen] = useState(false);
	const [editSale, setEditSale] = useState(null);
	const [editQty, setEditQty] = useState('');
	const [editName, setEditName] = useState('');
	const [editPhone, setEditPhone] = useState('');
	const [editError, setEditError] = useState('');

	// Confirm modal state
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [confirmMsg, setConfirmMsg] = useState('');
	const [onConfirm, setOnConfirm] = useState(() => () => {});

	// Success toast state
	const [toastMsg, setToastMsg] = useState('');
	const toastTimerRef = useRef(null);

	// Options derived from sales
	const { typeOptions, shapeOptions, colorOptions } = useMemo(() => {
		const types = new Set();
		const shapes = new Set();
		const colors = new Map(); // code -> name
		sales.forEach(s => {
			if (s.product?.typeName) types.add(s.product.typeName);
			if (s.product?.shapeName) shapes.add(s.product.shapeName);
			if (s.product?.colorCode) colors.set(s.product.colorCode, s.product.colorName || s.product.colorCode);
		});
		return {
			typeOptions: Array.from(types).sort(),
			shapeOptions: Array.from(shapes).sort(),
			colorOptions: Array.from(colors.entries()).map(([code, name]) => ({ code, name })).sort((a,b)=>a.name.localeCompare(b.name)),
		};
	}, [sales]);

	const rows = useMemo(() => {
		let list = sales;
		if (nameQuery.trim()) {
			const q = nameQuery.trim().toLowerCase();
			list = list.filter(r => r.buyerName?.toLowerCase().includes(q));
		}
		if (phoneQuery.trim()) {
			const p = phoneQuery.trim().toLowerCase();
			list = list.filter(r => (r.buyerPhone || '').toLowerCase().includes(p));
		}
		if (minQty !== '') {
			const min = Number(minQty) || 0;
			list = list.filter(r => Number(r.quantity) >= min);
		}
		if (maxQty !== '') {
			const max = Number(maxQty) || 0;
			list = list.filter(r => Number(r.quantity) <= max);
		}
		if (typeFilter !== 'all') {
			list = list.filter(r => r.product?.typeName === typeFilter);
		}
		if (shapeFilter !== 'all') {
			list = list.filter(r => r.product?.shapeName === shapeFilter);
		}
		if (colorFilter !== 'all') {
			list = list.filter(r => r.product?.colorCode === colorFilter);
		}
		if (fromDate) {
			const start = new Date(fromDate);
			start.setHours(0, 0, 0, 0);
			const fromTs = start.getTime();
			list = list.filter(r => new Date(r.createdAt).getTime() >= fromTs);
		}
		if (toDate) {
			const end = new Date(toDate);
			end.setHours(0, 0, 0, 0);
			end.setDate(end.getDate() + 1); // next day's start
			const toExclusive = end.getTime();
			list = list.filter(r => new Date(r.createdAt).getTime() < toExclusive);
		}
		// Sort by date
		const sorted = [...list].sort((a,b) => {
			const da = new Date(a.createdAt).getTime();
			const db = new Date(b.createdAt).getTime();
			return dateSort === 'desc' ? db - da : da - db;
		});
		return sorted;
	}, [sales, nameQuery, phoneQuery, minQty, maxQty, typeFilter, shapeFilter, colorFilter, fromDate, toDate, dateSort]);

	const showToast = (msg) => {
		setToastMsg(msg);
		clearTimeout(toastTimerRef.current);
		toastTimerRef.current = setTimeout(() => setToastMsg(''), 2200);
	};

	const clearFilters = () => {
		setNameQuery('');
		setPhoneQuery('');
		setMinQty('');
		setMaxQty('');
		setTypeFilter('all');
		setShapeFilter('all');
		setColorFilter('all');
		setFromDate('');
		setToDate('');
		setDateSort('desc');
	};

	const openEdit = (sale) => {
		setEditSale(sale);
		setEditQty(String(sale.quantity));
		setEditName(sale.buyerName || '');
		setEditPhone(sale.buyerPhone || '');
		setEditError('');
		setEditOpen(true);
	};

	const submitEdit = (e) => {
		e.preventDefault();
		if (!editSale) return;
		const qty = Number(editQty);
		if (!Number.isFinite(qty) || qty <= 0) { setEditError('الكمية يجب أن تكون أكبر من صفر'); return; }
		const phoneDigits = (editPhone || '').replace(/\D/g, '');
		if (phoneDigits.length && (phoneDigits.length < 7 || phoneDigits.length > 15)) { setEditError('يرجى إدخال رقم هاتف صالح'); return; }
		// Ask for confirmation before applying
		setConfirmMsg(`تأكيد حفظ التعديلات؟`);
		setOnConfirm(() => () => {
			const res = updateSale({ id: editSale.id, quantity: qty, buyerName: editName, buyerPhone: editPhone });
			if (res.ok) { 
				setEditOpen(false); 
				setConfirmOpen(false); 
				showToast('تم تعديل عملية البيع بنجاح');
			} else { 
				setEditError('المخزون غير كافٍ للتعديل'); 
				setConfirmOpen(false); 
			}
		});
		setConfirmOpen(true);
	};

	const askDelete = (sale) => {
		setConfirmMsg(`هل تريد حذف عملية بيع لِـ "${sale.buyerName || '-'}" بكمية ${sale.quantity}؟`);
		setOnConfirm(() => () => { 
			deleteSale(sale.id); 
			setConfirmOpen(false); 
			showToast('تم حذف عملية البيع بنجاح');
		});
		setConfirmOpen(true);
	};

	return (
		<MainContainer>
			<div className="sales-page">
				<Toast 
					message={toastMsg} 
					onClose={() => setToastMsg('')} 
				/>
				
				<div className="page-header">
					<div className="page-title">سجل المبيعات</div>
					
					<div className="rmvFilters" onClick={clearFilters}>
						<MdFilterListOff />
					</div>
					<div className="results-display">
						<span className="results-number">{rows.length}</span>
						<AiOutlineFileSearch />
						{/* <span className="results-label">نتيجة</span> */}
					</div>
					
					
					<FilterToggle
						isOpen={sidebarOpen}
						onToggle={() => setSidebarOpen(!sidebarOpen)}
					/>
				</div>


				<SalesTable
					sales={rows}
					onEdit={openEdit}
					onDelete={askDelete}
				/>
				<SalesCharts sales={rows} />


				<SalesSidebar
					isOpen={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
					// Filter values
					nameQuery={nameQuery}
					phoneQuery={phoneQuery}
					minQty={minQty}
					maxQty={maxQty}
					typeFilter={typeFilter}
					shapeFilter={shapeFilter}
					colorFilter={colorFilter}
					fromDate={fromDate}
					toDate={toDate}
					dateSort={dateSort}
					
					// Filter options
					typeOptions={typeOptions}
					shapeOptions={shapeOptions}
					colorOptions={colorOptions}
					
					// Filter setters
					setNameQuery={setNameQuery}
					setPhoneQuery={setPhoneQuery}
					setMinQty={setMinQty}
					setMaxQty={setMaxQty}
					setTypeFilter={setTypeFilter}
					setShapeFilter={setShapeFilter}
					setColorFilter={setColorFilter}
					setFromDate={setFromDate}
					setToDate={setToDate}
					setDateSort={setDateSort}
					
					// Actions
					clearFilters={clearFilters}
					resultsCount={rows.length}
				/>

				<EditSaleModal
					isOpen={editOpen}
					onClose={() => setEditOpen(false)}
					sale={editSale}
					editQty={editQty}
					editName={editName}
					editPhone={editPhone}
					editError={editError}
					setEditQty={setEditQty}
					setEditName={setEditName}
					setEditPhone={setEditPhone}
					onSubmit={submitEdit}
				/>

				<ConfirmModal
					isOpen={confirmOpen}
					onClose={() => setConfirmOpen(false)}
					message={confirmMsg}
					onConfirm={onConfirm}
				/>
			</div>
		</MainContainer>
	);
};

export default SalesPage;
