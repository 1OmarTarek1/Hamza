import React, { useState, useEffect, useRef } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useInventory } from '../../Context/InventoryContext';
import CardToast from './parts/CardToast/CardToast';
import InventoryActions from './parts/InventoryActions/InventoryActions';
import ColorOptions from './parts/ColorOptions/ColorOptions';
import InventoryStats from './parts/InventoryStats/InventoryStats';
import CardForm from './parts/CardForm/CardForm';
import './InventoryCard.css';

const InventoryCard = ({ item }) => {
  const { supplyStock, sellStock } = useInventory();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Flip/form state
  const [flipped, setFlipped] = useState(false);
  const [formMode, setFormMode] = useState('supply'); 
  const [quantity, setQuantity] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [error, setError] = useState('');

  // Success toast state
  const [toastMsg, setToastMsg] = useState('');
  const toastTimerRef = useRef(null);

  // refs
  const timerRef = useRef(null);         // variant transition timeout
  const wrapperRef = useRef(null);       // flip-wrapper ref
  const rafRef = useRef(null);           // for requestAnimationFrame scheduling
  const roRef = useRef(null);            // ResizeObserver instance

  // Initialize selectedVariant when component mounts or item changes
  useEffect(() => {
    if (item?.variants?.length > 0) {
      const filtered = item.variants.filter(v => v.isFiltered);
      const initialVariant = filtered.length > 0 ? filtered[0] : item.variants[0];
      setSelectedVariant(initialVariant);
    }
  }, [item]);

  // -------------------------
  // Height sync (lightweight)
  // -------------------------
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getFaces = () => {
      const front = wrapper.querySelector('.flip-face.front');
      const back = wrapper.querySelector('.flip-face.back');
      return { front, back };
    };

    const updateHeight = () => {
      const { front, back } = getFaces();
      if (!front || !back) return;

      // allow natural sizing while measuring
      // temporarily clear inline height so measurements are accurate
      const prevHeight = wrapper.style.height;
      wrapper.style.height = 'auto';

      // prefer scrollHeight (content height) but fallback to bounding rect
      const frontH = front.scrollHeight || front.getBoundingClientRect().height || 0;
      const backH = back.scrollHeight || back.getBoundingClientRect().height || 0;
      const maxH = Math.max(frontH, backH, 0);

      // set explicit height to avoid jumps when flipping
      wrapper.style.height = `${Math.ceil(maxH)}px`;

      // optional: keep min as previous if it was larger (prevents shrink animation)
      // wrapper.style.height = `${Math.max(parseInt(prevHeight || 0, 10), Math.ceil(maxH))}px`;
    };

    const scheduleUpdate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateHeight();
      });
    };

    // 1) ResizeObserver on both faces — fires when their content/layout changes
    const ro = new ResizeObserver(() => scheduleUpdate());
    roRef.current = ro;
    const { front, back } = getFaces();
    if (front) ro.observe(front);
    if (back) ro.observe(back);

    // 2) window resize — use requestAnimationFrame scheduling (lightweight)
    const onWindowResize = () => scheduleUpdate();
    window.addEventListener('resize', onWindowResize);

    // 3) initial measurement (and also measure after a short delay to catch images loading)
    scheduleUpdate();
    // measure again after images/lazy content likely loaded (small timeout)
    const t = setTimeout(scheduleUpdate, 150);

    return () => {
      // cleanup
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (roRef.current) {
        try { roRef.current.disconnect(); } catch (e) {}
        roRef.current = null;
      }
      window.removeEventListener('resize', onWindowResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    flipped,               // recalc when flip state changes
    selectedVariant?.id,   // recalc when variant image/content changes
    // form inputs are intentionally not added (too chatty) — ResizeObserver will catch form content changes
  ]);

  // -------------------------
  // variant selection handling
  // -------------------------
  const handleVariantSelect = (variant) => {
    if (!variant || (selectedVariant && variant.id === selectedVariant.id)) return;
    setIsTransitioning(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSelectedVariant(variant);
      setIsTransitioning(false);
    }, 200);
  };

  // cleanup timeouts when unmount
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(toastTimerRef.current);
    };
  }, []);

  const currentStock = selectedVariant?.inStock ?? 0;
  const soldItems = selectedVariant?.sold ?? 0;
  const totalItems = currentStock + soldItems;

  const openLightbox = (variantIndex) => {
    setCurrentIndex(variantIndex);
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lightbox-open");
    } else {
      document.body.classList.remove("lightbox-open");
    }
  }, [isOpen]);

  const openForm = (mode) => {
    setFormMode(mode);
    setFlipped(true);
    setQuantity('');
    setBuyerName('');
    setBuyerPhone('');
    setError('');
  };

  const closeForm = () => {
    setFlipped(false);
    setQuantity('');
    setBuyerName('');
    setBuyerPhone('');
    setError('');
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(''), 2200);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty <= 0) {
      setError('الكمية يجب أن تكون أكبر من صفر');
      return;
    }
    if (formMode === 'sell') {
      if (!buyerName.trim()) {
        setError('يرجى إدخال اسم المشتري');
        return;
      }
      const phoneDigits = buyerPhone.replace(/\D/g, '');
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        setError('يرجى إدخال رقم هاتف صالح');
        return;
      }
      if (qty > currentStock) {
        setError('لا يمكن بيع كمية أكبر من المخزون المتاح');
        return;
      }
    }

    const payload = {
      typeId: item.typeId,
      shapeId: item.id,
      variantId: selectedVariant.id,
      quantity: qty,
      buyerName: buyerName.trim(),
      buyerPhone: buyerPhone.trim(),
    };

    if (formMode === 'supply') {
      const ok = supplyStock(payload);
      if (ok) { closeForm(); showToast('تم التوريد بنجاح'); }
      return;
    }
    const res = sellStock(payload);
    if (res.ok) { closeForm(); showToast('تم البيع بنجاح'); }
  };

  if (!selectedVariant) return null;

  return (
    <div className={`InventoryCard ${flipped ? 'flipped' : ''}`}>
      {/* Success toast */}
      {toastMsg && (
        <CardToast message={toastMsg} />
      )}

      <div className="flip-wrapper" ref={wrapperRef}>
        {/* Front face */}
        <div className="flip-face front">
          <div
            className="CardImgWrapper"
            onClick={() => {
              const index = item.variants.findIndex(v => v.id === selectedVariant.id);
              openLightbox(index);
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              src={selectedVariant.image}
              alt={`${item.name} - ${selectedVariant.name}`}
              className={`card-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
              loading="lazy"
            />
            <div className="imgContent">
              <div className="type">{item.type}</div>
              <h3 className="shapeName">{item.name}</h3>
              <div className="color-name">{selectedVariant.name}</div>
              <InventoryActions onOpenForm={openForm} />
              <ColorOptions
                item={item}
                selectedVariant={selectedVariant}
                onSelect={(e, v) => { e.stopPropagation(); handleVariantSelect(v); }}
              />
            </div>
          </div>

          <div className="card-content">
            <div className="inventory-info">
              <InventoryStats
                currentStock={currentStock}
                soldItems={soldItems}
                totalItems={totalItems}
              />
            </div>
          </div>
        </div>

        {/* Back face with embedded form */}
        <div className="flip-face back">
          <CardForm
            item={item}
            selectedVariant={selectedVariant}
            formMode={formMode}
            quantity={quantity}
            buyerName={buyerName}
            buyerPhone={buyerPhone}
            error={error}
            onChangeQuantity={setQuantity}
            onChangeBuyerName={setBuyerName}
            onChangeBuyerPhone={setBuyerPhone}
            onSubmit={handleFormSubmit}
            onClose={closeForm}
            currentStock={currentStock}
          />
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={item.variants.map(v => ({ src: v.image }))}
        index={currentIndex}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        }}
      />
    </div>
  );
};

export default InventoryCard;
