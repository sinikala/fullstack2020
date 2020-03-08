import React from 'react'

import {
  Link,
} from "react-router-dom"

const UserList = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <table id='users'>
        <tbody>
          <tr><th> </th><th>blogs created</th></tr>
          {renderUser(users)}
        </tbody>

      </table>


    </div>
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


export default UserList