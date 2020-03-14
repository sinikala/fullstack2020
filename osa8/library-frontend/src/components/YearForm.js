import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries'


const YearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')


  const [editAuthor] = useMutation(EDIT_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      //setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name, born }
    })

    setName('')
    setBorn('')
  }

  let authorList = []
  authors.map(a => authorList = authorList.concat({ value: a.name, label: a.name }))

  const handleChoice = (e) => {
    setName(e.value)
  }

  return (
    <div>
      <h3> Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          placeholder="Select author"
          value={authorList.filter(a => a.value === name)}
          options={authorList}
          onChange={handleChoice}
        />
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default YearForm
