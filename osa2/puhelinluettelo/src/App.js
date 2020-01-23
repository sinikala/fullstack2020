import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    //event.preventDefault()
    const phonebookObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    personService
      .create(phonebookObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(
        setPersons(persons.filter(p => p.id !== id))
      )
      .catch(error => {
        alert(
          `The note you are trying to delete was already deleted from server`
        )
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleDeleteButton = id => {
    deletePerson(id)
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
      <ShowNumbers persons={showAll ? persons : filtered} handleDeleteButton={handleDeleteButton} />
    </div>
  )

}


const ShowNumbers = ({ persons, handleDeleteButton }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person, id) =>
        <Person key={id} person={person} handleDeleteButton={handleDeleteButton} />
      )}
    </div>
  )
}



export default App
