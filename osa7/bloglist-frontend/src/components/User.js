import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b =>
          <Blog key={b.id} title={b.title} />
        )}
      </ul>
    </div>
  )
}


const Blog = ({ title }) => {
  return (
    <li className='userBlogs'>
      {title}
    </li>
  )
}
export default User