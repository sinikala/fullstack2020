import React from 'react'

const Blog = ({ blog, toggleFullView, addLike }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'dashed',
    borderColor: 'lightblue',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = (event) => {
    event.preventDefault()
    addLike({ blog })
  }

  const handle = (event) => {
    event.preventDefault()
    toggleFullView({ blog })
  }

  if (blog.fullView === true) {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author} <button onClick={handle}>hide</button><br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={like}>like</button><br />
        added by: {blog.user.name}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author} <button onClick={handle}>view</button>

      </div>
    )
  }
}

export default Blog