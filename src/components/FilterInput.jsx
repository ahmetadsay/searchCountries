// FilterInput.jsx
import PropTypes from 'prop-types';

function FilterInput({ value, onChange }) {
  return (
    <input
      className='search'
      type="text"
      value={value} // Ensure the value prop is correctly passed to the input
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}

FilterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterInput;
