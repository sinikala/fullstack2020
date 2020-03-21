import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Select from 'react-select'
import { ALL_BOOKS } from '../queries'

export const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks


  let genres = ['all']
  books.map(b => b.genres.map(g => genres = genres.concat(g)))
  genres = genres.filter((genre, index) => genres.indexOf(genre) === index)

  let genreList = []
  genres.map(g => genreList = genreList.concat({ value: g, label: g }))

  const handleChoice = (e) => {
    if (e.value === 'all') {
      setGenre(null)
    } else {
      setGenre(e.value)
    }
  }


  return (
    <div>
      <h2>books</h2>
      <BookList genre={genre} />
      <h4>Filter by genre:</h4>
      <Select
        placeholder="Select genre"
        value={genreList.filter(g => g.value === genre)}
        options={genreList}
        onChange={handleChoice}
      />
    </div>
  )
}

export const BookList = ({ genre }) => {

  const result = useQuery(ALL_BOOKS, { variables: { genre: genre } })

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>
            author
            </th>
          <th>
            published
            </th>
        </tr>
        {books.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}