import React, { useState, useEffect } from 'react'
import contactService from './modules/contact'

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [notif, setNotif] = useState('')
    const [notifType, setNotifType] = useState('')

    useEffect(() => {
        contactService
            .getAll()
            .then(initialNotes => setPersons(initialNotes))

    }, [])

    const handleNameChange = e => {
        setNewName(e.target.value)
    }
    const handleNumChange = e => {
        setNewNum(e.target.value)
    }
    const handleSearchChange = e => {
        setNewSearch(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        const contact = persons.find(p => p.name.toUpperCase() === newName.toUpperCase())
        if (contact) {

            const result = window.confirm(`${newName} is already in the phone book, replace the old number with the new one?`);
            if (!result) return;

            const newContact = { ...contact, num: newNum }

            contactService
                .update(contact.id, newContact)
                .then(updatedNote => {
                    setPersons(persons.map(p => p.id !== contact.id ? p : updatedNote))
                    launchNotification('success', `Contact info successfully updated`)
                    setNewName('')
                    setNewNum('')
                })
                .catch(error => {
                    launchNotification('error',`${contact.name} not found`)
                })

        } else {
            const newID = Math.max(...persons.map(x => x.id)) + 1

            const newPerson = { name: newName, num: newNum, id: newID }
            contactService
                .create(newPerson)
                .then(returnedNote => {
                    setPersons(persons.concat(returnedNote))
                    launchNotification('success', 'Contact successfully added to the phonebook')
                    setNewName('')
                    setNewNum('')
                })
        }

    }
    const handleDeleteClick = props => {
        const message = `Delete ${persons.find(p => p.id === props).name} ?`
        if (!window.confirm(message)) return;

        contactService
            .deleteContact(props)
            .then(x => {
                setPersons(persons.filter(p => p.id !== props))
                launchNotification('success', 'Contact successfully deleted from the phonebook')
            })
    }

    const launchNotification = (type, message) => {
        setNotifType(type)
        setNotif(message)
        if (type === 'success') setTimeout(() => setNotif(''), 3224)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification type={notifType} message={notif} />
            <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
            <h3>Add new person</h3>
            <PersonForm handleSubmit={handleSubmit}
                newName={newName} handleNameChange={handleNameChange}
                newNum={newNum} handleNumChange={handleNumChange} />
            <h3>Numbers</h3>
            <Persons persons={persons} newSearch={newSearch} onClick={handleDeleteClick} />
        </div>
    )
}

const Filter = ({ newSearch, handleSearchChange }) => <div>Filter:<input type="text" value={newSearch} onChange={handleSearchChange} /> </div>
const PersonForm = ({ handleSubmit, newName, handleNameChange, newNum, handleNumChange }) => (
    < form onSubmit={handleSubmit} >
        <div>
            Name: <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
            Number: <input type="tel" value={newNum} onChange={handleNumChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form >)

const Persons = ({ persons, newSearch, onClick }) => {
    const personsFiltered = persons.filter(p => p.name.toUpperCase().indexOf(newSearch.toUpperCase()) !== -1)
    const rows = personsFiltered.map((p, i) => <Rows p={p} onClick={onClick} key={p.name + i.toString()} />)
    return (
        <ul>
            {rows}
        </ul>
    )
}
const Rows = ({ p, onClick }) => <li>{p.name} {p.num ? ': ' + p.num : ''} <button onClick={() => onClick(p.id)}>Delete</button> </li>


const Notification = ({ type, message }) => {
    if (!message) return null
    return (
        <div className={type === 'error' ? 'error' : 'success'}> {message}</div>
    )
}



export default App