import React from 'react'
import styled from 'styled-components'
import {
  Link,
} from "react-router-dom"

const UserList = ({ users }) => {

  return (
    <UserStyle>
      <h2>Users</h2>
      <table id='users'>
        <tbody>
          <tr><th> </th><th>blogs created</th></tr>
          {renderUser(users)}
        </tbody>

      </table>
    </UserStyle>
  )
}

const renderUser = (users) => {
  return users.map(user => {
    return (
      <tr key={user.id}>
        <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })
}


const UserStyle = styled.div`
border-radius: 3px;
padding: 0.5em 1em;
border: 1px solid Plum;
margin: 0.5em;
`
export default UserList