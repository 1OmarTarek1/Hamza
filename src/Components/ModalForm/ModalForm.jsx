import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './ModalForm.css';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const ModalForm = ({
	open,
	mode, // 'supply' | 'sell'
	onClose,
	onSubmit,
	product,
}) => {
	const [quantity, setQuantity] = useState('');
	const [buyerName, setBuyerName] = useState('');
	const [error, setError] = useState('');

	const maxSellable = useMemo(() => Number(product?.variant?.inStock ?? 0), [product]);

	useEffect(() => {
		if (!open) {
			setQuantity('');
			setBuyerName('');
			setError('');
		}
	}, [open]);

	useEffect(() => {
		setError('');
	}, [mode]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const qty = Number(quantity);
		if (!Number.isFinite(qty) || qty <= 0) {
			setError('الكمية يجب أن تكون أكبر من صفر');
			return;
		}

		if (mode === 'sell') {
			if (!buyerName.trim()) {
				setError('يرجى إدخال اسم المشتري');
				return;
			}
			if (qty > maxSellable) {
				setError('لا يمكن بيع كمية أكبر من المخزون المتاح');
				return;
			}
		}

		onSubmit({ quantity: qty, buyerName: buyerName.trim() });
	};

	if (!open) return null;

	return (
		<div className="modal-backdrop" role="dialog" aria-modal="true">
			<div className="modal">
				<div className="modal-header">
					<h3>{mode === 'supply' ? 'توريد مخزون' : 'بيع منتج'}</h3>
					<button className="close-btn" onClick={onClose} aria-label="Close">×</button>
				</div>
				<div className="modal-body">
					<div className="product-summary">
						<div><strong>النوع:</strong> {product?.typeName}</div>
						<div><strong>الشكل:</strong> {product?.shapeName}</div>
						<div><strong>اللون:</strong> {product?.variant?.name}</div>
						<div><strong>المخزون الحالي:</strong> {product?.variant?.inStock ?? 0}</div>
					</div>

					<form onSubmit={handleSubmit} className="form">
						<label className="form-row">
							<span>الكمية</span>
							<input
								type="number"
								min={1}
								max={mode === 'sell' ? maxSellable : undefined}
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
								required
							/>
						</label>

						{mode === 'sell' && (
							<label className="form-row">
								<span>اسم المشتري</span>
								<input
									type="text"
									value={buyerName}
									onChange={(e) => setBuyerName(e.target.value)}
									required
								/>
							</label>
						)}

						{error && <div className="error-text">{error}</div>}

						<div className="actions">
							<button type="button" className="btn secondary" onClick={onClose}>إلغاء</button>
							<button type="submit" className="btn primary">
								{mode === 'supply' ? 'إضافة للمخزون' : 'تأكيد البيع'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

ModalForm.propTypes = {
	open: PropTypes.bool.isRequired,
	mode: PropTypes.oneOf(['supply', 'sell']).isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	product: PropTypes.shape({
		typeId: PropTypes.string,
		typeName: PropTypes.string,
		shapeId: PropTypes.string,
		shapeName: PropTypes.string,
		variant: PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			code: PropTypes.string,
			inStock: PropTypes.number,
			sold: PropTypes.number,
		}),
	}).isRequired,
};

export default ModalForm;
