import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    const phonebookObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    }

    personService
      .create(phonebookObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification(`${newName} was added`)
        setNewName('')
        setNewNumber('')
      })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setNotification(`Succesfully deleted`)
      })
      .catch(error => {
        setError(
          `The person you are trying to delete was already deleted from server`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleUpdate = (event) => {
    const personToUpdate = persons.find(p => p.name === newName)
    const updatedPerson = { ...personToUpdate, number: newNumber }
    const id = personToUpdate.id

    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNotification(`${updatedPerson.name} updated`)
      })
      .catch(error => {
        setError(`${updatedPerson.name} has already been deleted from the server`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeleteButton = id => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id)
    }
  }

  const checkIfAlreadyExcists = (event) => {
    event.preventDefault()

    const match = persons.filter(person => (person.name.toUpperCase() === newName.toUpperCase()))

    if (match.length > 0) {
      const conf = window.confirm(`${newName} is already added to phonebook, replace the the old number with a new one?`)
      if (conf) {
        handleUpdate()
      }
      setNewName('')
      setNewNumber('')
    } else {
      addPerson()
    }

  }


  const handleFilterChange = (event) => {
    if (event.target.value.length > 0) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    const filteredPeople = persons.filter(person =>
      (person.name.toUpperCase().includes(event.target.value.toUpperCase())))
    setFiltered(filteredPeople)
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
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
