import React from 'react'
import styled from 'styled-components'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <UserStyle>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b =>
          <Blog key={b.id} title={b.title} />
        )}
      </ul>
    </UserStyle>
  )
}


const Blog = ({ title }) => {
  return (
    <li className='userBlogs'>
      {title}
    </li>
  )
}

const UserStyle = styled.div`
border-radius: 3px;
padding: 0.5em 1em;
border: 1px solid Plum;
margin: 0.5em;
`
export default User