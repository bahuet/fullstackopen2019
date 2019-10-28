

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <div>
                <h1>Give feedback</h1>
                <Button onClick={() => setGood(good + 1)} text='Good' />
                <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
                <Button onClick={() => setBad(bad + 1)} text='Bad' />
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>

        </>
    )
}

const Statistics = ({ good, bad, neutral }) => {
    const totalVotes = good + neutral + bad
    if (!totalVotes) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback has been gathered</p>
            </div>
        )
    }
    const totalScore = good - bad
    const avgScore = totalScore / totalVotes
    const posFeedback = good / totalVotes
    return (
        <div>
            <h1>Statistics</h1>
            <table>
            <tbody>
            <Statistic legend='Good' val={good}/>
            <Statistic legend='Neutral' val={neutral}/>
            <Statistic legend='Bad' val={bad}/>
            <Statistic legend='All' val={totalVotes}/>
            <Statistic legend='Average' val={avgScore.toFixed(2)}/>
            <Statistic legend='Positive' val={(posFeedback * 100).toFixed(2)} symbol='%'/>
            </tbody>
            </table>
        </div>
    )
}

const Statistic = ({val,legend,symbol}) => <tr><td>{legend}</td><td>{val}{symbol}</td></tr>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>



ReactDOM.render(<App />,
    document.getElementById('root')
)
ReactDOM.render(<App />, document.getElementById('root'));

