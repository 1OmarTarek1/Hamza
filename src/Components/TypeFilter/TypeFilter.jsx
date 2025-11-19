import PropTypes from 'prop-types';
import './TypeFilter.css';

const TypeFilter = ({ types, selectedType, onTypeSelect }) => {
  const handleClick = (type) => {
    onTypeSelect(type);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="type-filter">
      <div className="filter-buttons">
        <button
          className={selectedType === 'all' ? 'active' : ''}
          onClick={() => handleClick('all')}
          type="button"
        >
          الكل
        </button>
        {types.map((type) => (
          <button
            key={type.id}
            className={selectedType === type.id ? 'active' : ''}
            onClick={() => handleClick(type.id)}
            type="button"
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
};

TypeFilter.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedType: PropTypes.string.isRequired,
  onTypeSelect: PropTypes.func.isRequired,
};

export default TypeFilter;
