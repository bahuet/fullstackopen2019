import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import anecdotesService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    anecdotesService.getAll().then(a => props.initAnecdotes(a))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)