import { useState, useEffect } from "react";
import personService from './services/persons';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {
        persons.map(person =>
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>
              delete
            </button>
          </div>
        )
      }
    </div>
  )
}

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  const className = error? 'error': 'success';
  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  useEffect(() => {
    if (message === null) {
      return
    }
    const timeoutId = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => clearTimeout(timeoutId)
  }, [message])

  const addPerson = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      )
      if (confirmed) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(previousPersons =>
              previousPersons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setError(false)
            setMessage(`Updated ${returnedPerson.name}`)
          })
          .catch(() => {
            setError(true)
            setMessage(
              `Failed to update ${existingPerson.name}. The contact may have been deleted.`
            )
          })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(previousPersons => previousPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setError(false)
        setMessage(`Added ${returnedPerson.name}`)
      })
      .catch(() => {
        setError(true)
        setMessage(`Failed to add ${newName}`)
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(previousPersons =>
            previousPersons.filter(person => person.id !== id)
          )
          setError(false)
          setMessage(`Deleted ${name}`)
        })
        .catch(() => {
          setError(true)
          setMessage(`Failed to delete ${name}`)
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
};

export default App;