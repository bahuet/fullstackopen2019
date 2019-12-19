
import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notifReducer'
import { connect } from 'react-redux'
const AnecdoteForm = (props) => {

  const handleSubmit = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    props.addAnecdote(content)
    props.setNotif(`You added: ${content}`, 3)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )

}


export default connect(null,
  { addAnecdote, setNotif}
)(AnecdoteForm)