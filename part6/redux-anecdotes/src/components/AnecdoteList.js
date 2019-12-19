import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notifReducer'
import { connect } from 'react-redux'
import Filter from './Filter'



const AnecdoteList = (props) => {

  const onClick = a => {
    props.addVote(a.id)
    props.setNotif(`You voted for: ${a.content}`, 3)
  }


  const anecdoteList = (
    props.filteredAnecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => onClick(anecdote)}>vote</button>
        </div>
      </div>
    )
    )
  )

  return (<><Filter /> {anecdoteList} </>)
}

const anecdotesToShow = ({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter))

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    filteredAnecdotes: anecdotesToShow(state)
  }
}
const connectedAnnectodes = connect(mapStateToProps, { setNotif, addVote })(AnecdoteList)
export default connectedAnnectodes