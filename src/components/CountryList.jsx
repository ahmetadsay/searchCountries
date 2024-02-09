import PropTypes from "prop-types";

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  const shuffledArray = array.slice(); // Make a copy of the array to avoid mutating the original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function CountryList({ countries, selectedCountry, onCountryClick }) {
  // Shuffle the array of countries randomly
  const shuffledCountries = shuffleArray(countries);

  // Get the first 18 countries after shuffling
  const random18Countries = shuffledCountries.slice(0, 18);

  if (random18Countries.length < 18) {
    return null; // or return a loading indicator
  }

  return (
    <table>
      <tbody>
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 3 }).map((_, colIndex) => {
              const country = random18Countries[rowIndex * 3 + colIndex];
              return (
                <td key={colIndex} onClick={() => onCountryClick(country)}>
                  <img
                    src={`https://flagcdn.com/64x48/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                  />

                  {country.name}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  selectedCountry: PropTypes.object,
  onCountryClick: PropTypes.func.isRequired,
};

export default CountryList;
