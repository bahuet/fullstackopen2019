import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    const parts = [part1, part2, part3]
    const exs = [exercises1, exercises2, exercises3]
    return (
        <div>
            <Header course={course} />
            <Content parts={parts} exs={exs} />
            <Total exs={exs} />
        </div>
    )
}

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {

    return (
        <>
        {props.parts.map((x, i) => <p key={x}> {x} {props.exs[i]} </p>)}
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.exs.reduce((a, b) => a + b)}</p>
        </>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))