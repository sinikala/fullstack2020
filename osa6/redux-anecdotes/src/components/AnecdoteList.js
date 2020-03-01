import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyVote, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const initial = useSelector(state => state.anecdotes)
  const sorted = initial.sort((a, b) => { return b.votes - a.votes })

  const filte = useSelector(state => state.filter)
  /*   const anecdotes = useSelector(({ filter }) => {
      /* if (filter === 'ALL') {
        return sorted
      } 
      return sorted.filter(a =>
        (a.content.toUpperCase().includes(filter.toUpperCase())))
    }) */

  const anecdotes = sorted.filter(a =>
    (a.content.toUpperCase().includes(filte.toUpperCase())))

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(notifyVote(anecdote.content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList