import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyNew, hideNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    dispatch(notifyNew(event.target.anecdote.value))
    event.target.anecdote.value = ''
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit"> add </button>
      </form>
    </div>
  )
}

export default NewAnecdote