
import anecdoteService from '../services/anecdotes'



const anecdotes = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

    case 'VOTE':
      const id = action.data.id
      const anectodeToVote = state.find(a => a.id === id)
      const changedAnectote = { ...anectodeToVote, votes: anectodeToVote.votes + 1 }
      console.log(`state: ${state.map(a => a.id !== id ? a : changedAnectote).map(a => a.votes)}`)
      return state.map(a => a.id !== id ? a : changedAnectote).sort((a, b) => b.votes - a.votes)

    case "CREATE_ANECDOTE":
      return [...state, action.data]

    case "INIT_ANECDOTES":
      return (action.data)

    default:
      return state.sort((a, b) => b.votes - a.votes)
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}
export const addVote = id => {
  return async dispatch => {
    await anecdoteService.addVote(id)
    dispatch ({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initAnecdotes = content => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll(content)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export default anecdotes