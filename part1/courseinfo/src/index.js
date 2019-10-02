import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    )
}

const Content = (props) => {

    return (
        <>
            {props.parts.map(x => <p key={x.name}> {x.name} {x.exercises}  </p>)}
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.parts.map(x => x.exercises).reduce((a, b) => a + b)}</p>
        </>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))