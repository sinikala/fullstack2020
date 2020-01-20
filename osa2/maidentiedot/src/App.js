import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';



function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)

  }
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])




  return (
    <div >
      find countries
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={newFilter} />
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      <input value={props.newFilter}
        onChange={props.handleFilterChange} />
    </div>
  )
}

const Countries = ({ countries, filter }) => {
  const countriesToShow = countries.filter(country =>
    country.name.toUpperCase().includes(filter.toUpperCase()))

  if (countriesToShow.length > 10 && filter.length > 0) {
    return (
      <div>
        Too many matches, specify another filter
    </div>
    )
  }

  else if (countriesToShow.length === 1) {
    console.log(countriesToShow[0])
    return (
      <div>
        <CountryWithDetails country={countriesToShow[0]} />
      </div>
    )
  }

  else if (filter.length > 0) {
    return (
      <div>
        {countriesToShow.map((country, name) =>
          <Country key={name} country={country} />
        )}
      </div>
    )
  } else {
    return (
      <div> </div>
    )
  }
}

const Country = ({ country }) => {
  return (
    <div>
      {country.name}
    </div>
  )
}

const CountryWithDetails = ({ country }) => {
  return (

    <div>
      <h2>{country.name}</h2>
      capital {country.capital} <br />
      population {country.population}
      <h3>languages</h3>
      <ul>
        {country.languages.map((language, iso639_1) =>
          <li key={iso639_1}> {language.name} </li>
        )}
      </ul>


      <img width="150" heigth="250" src={country.flag} alt="flag" border="1"></img>
    </div>


  )
}

export default App;
