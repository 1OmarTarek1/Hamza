import './ColorOptions.css'

const ColorOptions = ({ item, selectedVariant, onSelect }) => {
  return (
    <div className="color-options">
      {item.variants.map((variant) => {
        const isActive = selectedVariant.id === variant.id;
        const isFiltered = variant.isFiltered !== false;

        return (
          <button
            key={variant.id}
            className={`color-swatch ${isActive ? 'active' : ''} ${!isFiltered ? 'not-filtered' : ''}`}
            style={{ backgroundColor: variant.code }}
            onClick={(e) => onSelect(e, variant)}
            title={variant.name}
            aria-pressed={isActive}
          />
        );
      })}
    </div>
  );
};

export default ColorOptions;


