import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [anekdootit, setAnekdootit] = useState(props.anecdotes)


    const handleVote = () => {
        const newAnekdootit = [...anekdootit]
        newAnekdootit[selected].votes = newAnekdootit[selected].votes + 1
        setAnekdootit(newAnekdootit)

    }

    const handleNewClick = () => {
        let max = 5
        let min = 0
        let newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        setSelected(newNumber)
    }

    const renderPopularAnecdote = () => {
        if (anekdootit.length === 0) return null
        const popular = anekdootit.reduce((acc, cur) => {
            if (cur.votes > acc.votes) return cur
            return acc
        }, anekdootit[0])

        return (
            <div>
                {popular.anecdote} <br />
                has {popular.votes} votes
            </div>
        )
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            {anekdootit[selected].anecdote} <br />
            has {anekdootit[selected].votes} votes <br />
            <button onClick={handleNewClick}>next anecdote</button>
            <button onClick={handleVote}>vote</button>
            <h2>Anecdote with most votes</h2>
            {renderPopularAnecdote()}
        </div>
    )
}


const anecdotes = [
    {
        anecdote: 'If it hurts, do it more often',
        votes: 0
    },
    {
        anecdote: 'Adding manpower to a late software project makes it later!',
        votes: 0
    },
    {
        anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        votes: 0
    },
    {
        anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes: 0
    },
    {
        anecdote: 'Premature optimization is the root of all evil.',
        votes: 0
    },
    {
        anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        votes: 0
    }
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)