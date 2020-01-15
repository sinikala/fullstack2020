
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)


const Statistics = ({ good, bad, neutral }) => {
    const all = good + bad + neutral
    var average = (good - bad) / all

    if (all === 0) {
        return (
            <div>
                <h2>Statistics:</h2>
                No feedback given

        </div>
        )
    }
    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={all} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={good / all * 100} />
            </tbody>
        </table>

    )
}

const StatisticLine = ({ text, value }) => {
    if (text === "positive") {
        return (
            <tr>
                <td> {text} </td><td>{value} % </td>
            </tr>
        )
    }
    return (
        <tr>
            <td> {text} </td><td> {value} </td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    const handleGood = () => {
        setGood(good + 1)
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <div>
                <h1>Give feedback</h1>

                <Button onClick={handleGood} text='Good' />
                <Button onClick={handleNeutral} text='Neutral' />
                <Button onClick={handleBad} text='Bad' />
                <h2>Statistics:</h2>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)