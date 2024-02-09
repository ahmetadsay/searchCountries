// App.jsx
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
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await client.query({ query: LIST_COUNTRIES });
        if (data && data.countries) {
          setCountries(data.countries);
          const defaultCountry = Math.min(9, data.countries.length - 1);
          setSelectedCountry(data.countries[defaultCountry]);

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

    setCountries(filteredCountries);
  }, [filter, selectedContinent, countries]);

  function handleFilterChange(value) {
    setFilter(value);
  }

  function handleContinentSelect(continent) {
    setSelectedContinent(continent);
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
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryClick={setSelectedCountry}
      />
    </div>
  );
}

export default App;
