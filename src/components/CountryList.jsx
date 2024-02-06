// CountryList.jsx
import PropTypes from 'prop-types';

const colors = ['red', 'green', 'blue', 'yellow', 'purple']; // predefined set of colors

function CountryList({ countries, selectedCountry, onCountryClick }) {
  return (
    <ul>
      {countries.map((country, index) => (
        <li
          key={country.code}
          onClick={() => onCountryClick(country)}
          style={{
            backgroundColor: country === selectedCountry ? colors[index % colors.length] : 'white',
          }}
        >
          {country.name}
        </li>
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  selectedCountry: PropTypes.object,
  onCountryClick: PropTypes.func.isRequired,
};

export default CountryList;