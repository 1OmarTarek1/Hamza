import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import curtainTypesSource from '../../Data/inventoryData';

const InventoryContext = createContext();

// Helper: deep clone simple JSON-like structures
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Helper: Load from localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Helper: Save to localStorage
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const InventoryProvider = ({ children }) => {
  // Initialize inventory state from localStorage or data source
  const [inventory, setInventory] = useState(() => 
    loadFromLocalStorage('inventory', deepClone(curtainTypesSource))
  );
  const [sales, setSales] = useState(() => 
    loadFromLocalStorage('sales', [])
  );

  // Save to localStorage whenever inventory or sales change
  useEffect(() => {
    saveToLocalStorage('inventory', inventory);
  }, [inventory]);

  useEffect(() => {
    saveToLocalStorage('sales', sales);
  }, [sales]);

  const findVariantRef = (types, typeId, shapeId, variantId) => {
    const type = types.find(t => t.id === typeId);
    if (!type) return {};
    const shape = (type.shapes || []).find(s => s.id === shapeId);
    if (!shape) return {};
    const variant = (shape.variants || []).find(v => v.id === variantId);
    return { type, shape, variant };
  };

  const supplyStock = ({ typeId, shapeId, variantId, quantity }) => {
    const qty = Number(quantity) || 0;
    if (qty <= 0) return false;
    setInventory(prev => {
      const next = deepClone(prev);
      const { variant } = findVariantRef(next, typeId, shapeId, variantId);
      if (!variant) return prev;
      variant.inStock = (Number(variant.inStock) || 0) + qty;
      return next;
    });
    return true;
  };

  const sellStock = ({ typeId, shapeId, variantId, quantity, buyerName, buyerPhone }) => {
    const qty = Number(quantity) || 0;
    if (qty <= 0) return { ok: false, reason: 'INVALID_QTY' };
    let record = null;
    let ok = false;
    setInventory(prev => {
      const next = deepClone(prev);
      const { type, shape, variant } = findVariantRef(next, typeId, shapeId, variantId);
      if (!variant) return prev;
      const current = Number(variant.inStock) || 0;
      if (qty > current) {
        ok = false;
        return prev; // prevent oversell
      }
      variant.inStock = current - qty;
      variant.sold = (Number(variant.sold) || 0) + qty;
      ok = true;
      record = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        buyerName: String(buyerName || '').trim(),
        buyerPhone: String(buyerPhone || '').trim(),
        quantity: qty,
        product: {
          typeId: type.id,
          typeName: type.name,
          shapeId: shape.id,
          shapeName: shape.name,
          variantId: variant.id,
          colorName: variant.name,
          colorCode: variant.code,
        },
        createdAt: new Date().toISOString(),
      };
      return next;
    });
    if (ok && record) {
      setSales(prev => [record, ...prev]);
      return { ok: true };
    }
    return { ok: false, reason: 'INSUFFICIENT_STOCK' };
  };

  const deleteSale = (saleId) => {
    let saleToDelete = null;
    setSales(prev => {
      saleToDelete = prev.find(s => s.id === saleId) || null;
      return prev.filter(s => s.id !== saleId);
    });
    if (!saleToDelete) return { ok: false, reason: 'NOT_FOUND' };
    // Revert inventory
    setInventory(prev => {
      const next = deepClone(prev);
      const { variant } = findVariantRef(next, saleToDelete.product.typeId, saleToDelete.product.shapeId, saleToDelete.product.variantId);
      if (!variant) return prev;
      const qty = Number(saleToDelete.quantity) || 0;
      variant.inStock = (Number(variant.inStock) || 0) + qty;
      variant.sold = Math.max(0, (Number(variant.sold) || 0) - qty);
      return next;
    });
    return { ok: true };
  };

  const updateSale = ({ id, quantity, buyerName, buyerPhone }) => {
    let prevSale = null;
    setSales(prev => {
      const next = [...prev];
      const saleIndex = next.findIndex(s => s.id === id);
      if (saleIndex === -1) return prev;
      prevSale = { ...next[saleIndex] };
      next[saleIndex] = {
        ...prevSale,
        buyerName: String(buyerName || '').trim(),
        buyerPhone: String(buyerPhone || '').trim(),
        quantity: Number(quantity) || 0,
      };
      return next;
    });
    if (!prevSale) return { ok: false, reason: 'NOT_FOUND' };
    // Update inventory if quantity changed
    const qtyChange = Number(quantity) - (Number(prevSale.quantity) || 0);
    if (qtyChange !== 0) {
      setInventory(prev => {
        const next = deepClone(prev);
        const { variant } = findVariantRef(
          next,
          prevSale.product.typeId,
          prevSale.product.shapeId,
          prevSale.product.variantId
        );
        if (!variant) return prev;
        const currentInStock = Number(variant.inStock) || 0;
        if (qtyChange > currentInStock) {
          // Revert the sale update if not enough stock
          setSales(prev => {
            const nextSales = [...prev];
            const saleIndex = nextSales.findIndex(s => s.id === id);
            if (saleIndex !== -1) {
              nextSales[saleIndex] = prevSale;
            }
            return nextSales;
          });
          return prev;
        }
        variant.inStock = currentInStock - qtyChange;
        variant.sold = (Number(variant.sold) || 0) + qtyChange;
        return next;
      });
    }
    return { ok: true };
  };

  const value = useMemo(() => ({
    inventory,
    sales,
    supplyStock,
    sellStock,
    deleteSale,
    updateSale,
  }), [inventory, sales]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
};

export default InventoryContext;
