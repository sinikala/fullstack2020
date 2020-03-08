import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderRadius: 8,
    border: 'dashed',
    borderColor: 'lightblue',
    borderWidth: 1,
    marginBottom: 5
  }

  const [fullView, toggleFullView] = useState(false)

  const like = () => {
    addLike({ blog })
  }

  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
    }
  }

  if (fullView === true) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} - {blog.author} <button onClick={() => toggleFullView(!fullView)}> hide </button><br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={like}> like </button><br />
        added by: {blog.user.name} <br />
        {blog.user.username === user.username
          ? <button id='remove-button' onClick={remove}> remove </button>
          : <p></p>}
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} - {blog.author} <button id='view-button' onClick={() => toggleFullView(!fullView)}> view </button>
      </div>
    )
  }
}
Blog.propTypes = {
  //buttonLabel: PropTypes.string.isRequired
  removeBlog: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired
}

export default Blog


