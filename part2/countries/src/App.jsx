import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.join(', ') || 'N/A'}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages || {}).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        width="150"
      />
      <Weather key={country.cca3} country={country} />
    </div>
  )
}



const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const latitude = country.capitalInfo?.latlng?.[0]
  const longitude = country.capitalInfo?.latlng?.[1]

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) {
      return
    }

    let cancelled = false

    weatherService
      .getWeather(latitude, longitude)
      .then(data => {
        if (!cancelled) {
          setWeather(data)
          setLoading(false)
        }
      })
      .catch(error => {
        if (!cancelled) {
          setError(error.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [latitude, longitude])

  if (latitude === undefined || longitude === undefined) {
    return <p>Capital coordinates are unavailable</p>
  }

  if (loading) {
    return <p>Loading weather...</p>
  }

  if (error) {
    return <p>Weather error: {error}</p>
  }

  return (
    <div>
      <h3>Weather in {country.capital?.[0]}</h3>

      <p>Temperature: {weather.main.temp} °C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>Description: {weather.weather[0].description}</p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
    </div>
  )
}



const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(data => {
        setCountries(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [])
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }
  const matchingCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  if (loading) {
    return <p>Loading countries...</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }
  return (
    <div>
      <h1>Countries</h1>
      <div>
        Find countries:
        <input value={search} onChange={handleSearchChange} />
      </div>
      {search.trim() !== '' && matchingCountries.length > 10 &&
        <p>Too many matches, specify another filter</p>
      }
      {search.trim() !== '' && matchingCountries.length === 0 &&
        <p>No countries found</p>
      }
      {matchingCountries.length > 1 &&
        matchingCountries.length <= 10 &&
        <ul>
          {matchingCountries.map(country =>
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>
                Show
              </button>
            </li>
          )}
        </ul>
      }
      {matchingCountries.length === 1 &&
        <Country country={matchingCountries[0]} />
      }
      {selectedCountry !== null &&
        <Country country={selectedCountry} />
      }
    </div>
  )
}

export default App