import PropTypes from "prop-types";

function CountryList({ countries }) {
  const random18Countries = countries.slice(0, 18);

  // Function to chunk the array into 3 columns
  function chunkArray(arr, size) {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  }

  const chunkedCountries = chunkArray(random18Countries, 3); // Chunk the array into 3 columns

  return (
    <table className="country-table">
      {" "}
      {/* Add class for styling */}
      <tbody>
        {chunkedCountries.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((country, colIndex) => (
              <td key={colIndex}>{country.name}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
};

export default CountryList;
