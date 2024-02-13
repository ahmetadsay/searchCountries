import { useState, useEffect } from "react";
import "./App.css";
import FilterInput from "./components/FilterInput";
import CountryList from "./components/CountryList";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

const LIST_COUNTRIES = gql`
  query ListCountries {
    countries {
      code
      name
      continent {
        code
        name
      }
    }
  }
`;

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedColor, setSelectedColor] = useState(""); // Store the color of the selected item

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await client.query({ query: LIST_COUNTRIES });
        if (data && data.countries) {
          setCountries(data.countries);
          setFilteredCountries(data.countries); // Initialize filtered countries
          const defaultCountryIndex = Math.min(9, data.countries.length - 1);
          setSelectedCountry(data.countries[defaultCountryIndex]);
          setSelectedColor(getRandomColor()); // Set initial color for selected item

          // Extract unique continents
          const uniqueContinents = [
            ...new Set(data.countries.map((country) => country.continent.code)),
          ];
          setContinents(uniqueContinents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filteredCountries = countries;

    // Apply filter based on input value
    if (filter) {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Apply filter based on selected continent
    if (selectedContinent) {
      filteredCountries = filteredCountries.filter(
        (country) => country.continent.code === selectedContinent
      );
    }

    setFilteredCountries(filteredCountries);
  }, [filter, selectedContinent, countries]);

  useEffect(() => {
    // Automatically select the 10th item, or the last one if the amount of items is smaller than 10
    if (filteredCountries.length > 0) {
      const index = Math.min(9, filteredCountries.length - 1);
      setSelectedCountry(filteredCountries[index]);
    }
  }, [filteredCountries]);

  function handleFilterChange(value) {
    setFilter(value);
  }

  function handleContinentSelect(continent) {
    setSelectedContinent(continent);
  }

  function handleCountrySelect(country) {
    setSelectedCountry(country);
    setSelectedColor(getRandomColor()); // Change color for the newly selected item
  }

  function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#33B8FF", "#FF33E6"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="App">
      <FilterInput value={filter} onChange={handleFilterChange} />
      <select
        className="dropdown"
        value={selectedContinent}
        onChange={(e) => handleContinentSelect(e.target.value)}
      >
        <option value="">Select Continent</option>
        {continents.map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </select>
      <CountryList
        countries={filteredCountries}
        selectedCountry={selectedCountry}
        onCountryClick={handleCountrySelect}
        selectedColor={selectedColor}
      />
    </div>
  );
}

export default App;
