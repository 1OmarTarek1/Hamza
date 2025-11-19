import { useRef, useEffect } from 'react';
import { GalleryItems } from '../../Components';
import { GalleryItemsData } from '../../Data/GalleryItemsData';
import './category.css';

const Category = () => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);
  const lastY = useRef(0);
  const velocity = useRef(0);
  const momentumId = useRef(null);
  const dragMoved = useRef(false);

  const onPointerDown = (e) => {
    const el = containerRef.current;
    if (!el) return;

    isDragging.current = true;
    dragMoved.current = false;
    startY.current = e.clientY;
    startScrollTop.current = el.scrollTop;
    lastY.current = startY.current;
    velocity.current = 0;

    el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');

    cancelAnimationFrame(momentumId.current);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;

    const el = containerRef.current;
    const dy = e.clientY - startY.current;

    if (!dragMoved.current && Math.abs(dy) < 2) return;
    dragMoved.current = true;

    velocity.current = e.clientY - lastY.current;
    lastY.current = e.clientY;

    e.preventDefault();

    // تحديث scroll عبر requestAnimationFrame لتقليل التقطيع
    requestAnimationFrame(() => {
      el.scrollTop = startScrollTop.current - dy * 1;
    });
  };

  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const el = containerRef.current;
    el.classList.remove('dragging');

    const momentum = () => {
      if (Math.abs(velocity.current) > 0.5) {
        el.scrollTop -= velocity.current;
        velocity.current *=  .95; // تقليل السرعة تدريجيًا
        momentumId.current = requestAnimationFrame(momentum);
      }
    };
    momentum();
  };

  // Handle pointerup / pointercancel globally
  useEffect(() => {
    const handlePointerUp = () => endDrag();
    const handlePointerCancel = () => endDrag();

    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="categoryContainer"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
    >
      <GalleryItems 
        items={GalleryItemsData} 
        shuffle={true} 
        slice={true} 
        sliceCount={30} 
      />
    </div>
  );
};

export default Category;
