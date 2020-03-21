import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query{
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String){
    allBooks (
      genre: $genre
    ){
      title
      published
      genres
      author {
        name
      }
    }
  }
`
export const GET_USER = gql`
  query{
    me {
      username
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql` 
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title,
    published,
    author{
      name
    }
    genres
  }
}
`

export const EDIT_AUTHOR_BIRTHYEAR = gql`
mutation editAuthor($name: String!, $born: Int!){
  editAuthor(
    name: $name,
    setBornTo: $born
  ){
    name,
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`