import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER, ALL_BOOKS } from '../queries'
import { BookList } from './Books'


const Recommended = ({ show }) => {

  const result = useQuery(GET_USER)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = result.data.me.favoriteGenre

  return (
    <div>
      <h2>Recommendations</h2>
        books in your favourite genre <b>{favoriteGenre}:</b>
      <BookList genre={favoriteGenre} />
    </div>
  )
}

export default Recommended