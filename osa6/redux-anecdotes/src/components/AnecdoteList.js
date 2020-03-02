import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }


  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  const sorted = state.anecdotes.sort((a, b) => { return b.votes - a.votes })

  return {
    anecdotes: sorted.filter(a =>
      (a.content.toUpperCase().includes(state.filter.toUpperCase())))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}


const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedNotes