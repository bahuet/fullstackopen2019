import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                },
                {
                    name: '8484848448',
                    exercises: 7,
                    id: 3
                }
            ]
        },{
            name: 'EPS',
            id: 3,
            parts: [
                {
                    name: 'atheltisme',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'lancer de poids',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'haltero',
                    exercises: 7,
                    id: 3
                }
            ]
        }

    ]

    return (
        <div>
            <Courses courses={courses} />
        </div>
    )
}

const Courses = ({ courses }) => {
    const rows = courses.map(course => <Course course={course} key={course.id} />)
    return (
        <div>
            <h1>Web dev curriculum</h1>
            {rows}

        </div>

    )
}


ReactDOM.render(<App />, document.getElementById('root'))