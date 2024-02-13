import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function CountryList({
  countries,
  onCountryClick,
  selectedCountry,
  selectedColor,
}) {
  const [randomCountries, setRandomCountries] = useState([]);

  useEffect(() => {
    const copiedCountries = [...countries];
    const shuffledCountries = copiedCountries.sort(() => Math.random() - 0.5);
    const random18Countries = shuffledCountries.slice(0, 18);
    setRandomCountries(random18Countries);
  }, [countries]);

  const handleCountryClick = (country) => {
    onCountryClick(country);
  };

  const getBackgroundColor = (country) => {
    return selectedCountry && selectedCountry.code === country.code
      ? selectedColor
      : "transparent";
  };

  const renderCountryCell = (country) => (
    <td
      key={country.code}
      onClick={() => handleCountryClick(country)}
      style={{ backgroundColor: getBackgroundColor(country) }}
    >
      <img
        src={`https://flagcdn.com/32x24/${country.code.toLowerCase()}.png`}
        alt={country.name}
      />
      <div className="country-name">{country.name}</div>
    </td>
  );

  const rows = [];
  for (let i = 0; i < 6; i++) {
    const cells = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const country = randomCountries[index];
      if (!country) break;
      cells.push(renderCountryCell(country));
    }
    rows.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <table className="country-table">
      <tbody>{rows}</tbody>
    </table>
  );
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  selectedCountry: PropTypes.object,
  selectedColor: PropTypes.string,
  onCountryClick: PropTypes.func.isRequired,
};

export default CountryList;
