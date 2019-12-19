import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import anecdotes from './reducers/anecdoteReducer'
import notification from './reducers/notifReducer'
import filter from './reducers/filterReducer'


const reducer = combineReducers({ anecdotes, notification, filter })

const store = createStore(reducer, applyMiddleware(thunk))

export default store