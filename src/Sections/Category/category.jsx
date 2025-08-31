import { useRef } from 'react';
import { GalleryItems } from '../../Components';
import { GalleryItemsData } from '../../Data/GalleryItemsData';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const onPointerDown = (e) => {
    const el = containerRef.current;
    if (!el) return;
  
    isDragging.current = true;
    dragMoved.current = false;
    startY.current = e.clientY;
    startScrollTop.current = el.scrollTop;
  
    // ✅ تهيئة lastY بنفس startY لتجنب القفزة
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
  
    // ✅ تجاهل حركة صغيرة جدًا في أول حركة
    if (!dragMoved.current && Math.abs(dy) < 2) return;
  
    dragMoved.current = true;
  
    // ✅ السحب
    el.scrollTop = startScrollTop.current - dy * 1.4;
  
    // ✅ حساب السرعة للزحلقة
    velocity.current = e.clientY - lastY.current;
    lastY.current = e.clientY;
  
    e.preventDefault();
  };
  

  const onPointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const el = containerRef.current;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (_) {}

    el.classList.remove('dragging');

    // ✅ لو مفيش سحب → اعتبرها كليك وافتح اللينك
    // if (!dragMoved.current) {
    //     const link = e.target.closest("a");
    //     if (link) {
    //         const url = link.getAttribute("href");
    //         if (url) navigate(url);
    //     }
    //     return;
    // }

    // زحلقة
    const momentum = () => {
      if (Math.abs(velocity.current) > 0.8) {
        el.scrollTop -= velocity.current * 1.6;
        velocity.current *= 0.99;
        momentumId.current = requestAnimationFrame(momentum);
      }
    };
    momentum();
  };

  return (
    <div
      ref={containerRef}
      className="categoryContainer"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
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