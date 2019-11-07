import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}

const WeatherInfo = ({ cityName, weather, setWeather }) => {
  const ACCESS_KEY = '700d28ec1277781348918ad0c0aeda2c'
  const weatherURL = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${cityName}`

  useEffect(() => {
    axios
      .get(weatherURL)
      .then(response => {

        setWeather(response.data)
      })
  }, [])
  console.log(weather)

  return weather != null ? (
    <div>
      <h3>Weather in {cityName}</h3>
      <p>Temperature: {weather.current.temperature} degrees</p>
      <img src={weather.current.weather_icons[0]} alt='weather icon' />
      <p>Wind: {weather.current.wind_speed} kph to {weather.current.wind_dir}</p>

    </div>
  ) : <p>no weather data</p>
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [displayInfo, setDisplayInfo] = useState(null)
  const [weather, setWeather] = useState(null)


  const countriesToDisplay =
    [...countries].filter(c => c.name.toUpperCase().indexOf(newSearch.toUpperCase()) !== -1)


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
    , []
  )

  const handleChange = e => {
    setNewSearch(e.target.value)
    setDisplayInfo(null)
  }

  const handleClick = (props) => {
    setDisplayInfo(props)
  }


  return (
    <>
      <p>Find countries:<input
        type='text'
        value={newSearch}
        onChange={handleChange} /></p>
      <Countries countries={countriesToDisplay} onClick={handleClick} />
      {displayInfo != null ?
        <CountryInfo i={displayInfo} countries={countriesToDisplay} weather={weather} setWeather={setWeather} />
        : ''}
    </>
  )


}

const Countries = ({ countries, onClick }) => {
  if (countries.length > 10) {
    return 'Too many matches, please adjust your search'
  }
  if (countries.length === 1) {
    return (
      <CountryInfo i={0} countries={countries} />
    )
  }
  if (countries.length === 0) {
    return 'No results'
  }

  return (
    <ul>
      {countries.map((c, i) => <li key={c.name}>{c.name} <button onClick={() => onClick(i)}>Show</button></li>)}
    </ul>)
}

const CountryInfo = ({ i, countries, weather, setWeather }) => {
  const c = countries[i]
  return (<div>
    <h2>{c.name}</h2>
    <p>Capital: {c.capital}</p>
    <p>Population: {c.population}</p>
    <h3>Languages</h3>
    <ul>
      {c.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
    </ul>
    <img className='countryflag' src={c.flag} alt={c.name + 'national flag'} />
    <WeatherInfo cityName={countries[i].capital} weather={weather} setWeather={setWeather} />
  </div>)
}



export default App;
