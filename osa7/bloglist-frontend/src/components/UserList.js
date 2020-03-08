import React from 'react'


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
        <td>{user.name}</td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })
}


export default UserList