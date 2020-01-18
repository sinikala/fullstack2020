import React from 'react'



const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <div><h2>{props.course.name}</h2></div>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part, id) =>
                <Part key={id} part={part} />
            )}
        </div >
    )
}


//<ul style={{ listStyleType: "none" }}>  </ul>


const Part = ({ part }) => {
    return (
        <div>{part.name} {part.exercises} </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((acc, curr) => {
        if (parts.length === 0) return 0
        return acc + curr.exercises
    }, 0)
    return (
        <div>
            <b>Total of {total} exercises</b>
        </div>
    )
}

export default Course