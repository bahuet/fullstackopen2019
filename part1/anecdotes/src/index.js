import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
    const handleNext = () => {
        const randomNumber = Math.floor(props.anecdotes.length * Math.random())
        setSelected(randomNumber)
    }
    const handleVote = () => {
        const newVotes = [...votes]
        newVotes[selected]++
        setVotes(newVotes)
    }

    return (
        <>
            <AnecdoteOfTheDay
                anecdotes={props.anecdotes}
                selected={selected}
                handleNext={handleNext}
                handleVote={handleVote}
            />

            <AnecdoteWithMostVotes
                anecdotes={props.anecdotes}
                votes={votes}
            />

        </>
    )
}
const AnecdoteOfTheDay = ({ anecdotes, selected, handleNext, handleVote }) => (
    <div>
        <h1> Anecdote of the day</h1>
        <p>
            {anecdotes[selected]}
        </p>
        <p>
            <button onClick={handleNext}>Next quote</button>
            <button onClick={handleVote}>Vote</button>
        </p>
    </div>
)


const AnecdoteWithMostVotes = ({ anecdotes, votes }) => {
    console.log(votes)

    const mostVotes = Math.max(...votes)
    const voteWinnerIndex = votes.indexOf(mostVotes)
    return (
        <div>
            <h1> Anecdote with most votes</h1>

            <p>{anecdotes[voteWinnerIndex]} ({mostVotes} votes)</p>

        </div>

    )

}




const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)