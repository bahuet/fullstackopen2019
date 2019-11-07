import React from 'react'



const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
        </div>
    )

}

const Header = ({ title }) => <h2>{title}</h2>
const Content = ({ parts }) => {
    return (
        <>
            <ul> {parts.map(p => <Part part={p} key={p.id} />)} </ul>
            <Total parts={parts} />
        </>)
}
const Part = ({ part }) => <li>{part.name}: {part.exercises}</li>
const Total = ({ parts }) => <strong>Total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</strong>

export default Course 