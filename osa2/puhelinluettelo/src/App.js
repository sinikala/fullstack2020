import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const checkIfAlreadyExcists = (event) => {
    event.preventDefault()

    const match = persons.filter(person => (person.name.toUpperCase() === newName.toUpperCase()))

    if (match.length > 0) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      addPerson()
    }

  }

  const addPerson = (event) => {
    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(phonebookObject))
    setNewName('')
    setNewNumber('')

  }


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    if (event.target.value.length > 0) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    const filteredPeople = persons.filter(person =>
      (person.name.toUpperCase().includes(event.target.value.toUpperCase())))
    setFiltered(filteredPeople)
    setNewFilter(event.target.value)
    console.log(filteredPeople)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      filter with name <input value={newFilter}
        onChange={handleFilterChange} />
      <h3>Add an new person</h3>
      <form onSubmit={checkIfAlreadyExcists}>
        <div>name: <input value={newName}
          onChange={handleNameChange} /> </div>
        <div>number: <input value={newNumber}
          onChange={handleNumberChange} /> </div> <br />
        <button type="submit">add</button>
      </form>
      <ShowNumbers persons={showAll ? persons : filtered} />
    </div>
  )

}


const ShowNumbers = ({ persons }) => {

  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person, name) =>
        <Person key={name} person={person} />
      )}
    </div>
  )
}



export default App
