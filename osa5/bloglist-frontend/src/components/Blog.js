import React from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, toggleFullView, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderRadius: 8,
    border: 'dashed',
    borderColor: 'lightblue',
    borderWidth: 1,
    marginBottom: 5
  }
  /*
  const removeButtonStyle = {
    backgroundColor: 'lightblue',
    borderRadius: 8,
    border: 'solid',
    borderWidth: 0.5,
  }
*/
  const like = (event) => {
    event.preventDefault()
    addLike({ blog })
  }

  const handle = (event) => {
    event.preventDefault()
    toggleFullView({ blog })
  }
  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
    }

  }

  if (blog.fullView === true) {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author} <button onClick={handle}> hide </button><br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={like}> like </button><br />
        added by: {blog.user.name} <br />
        {blog.user.name === user.name
          ? <button /*style={removeButtonStyle} */ onClick={remove}> remove </button>
          : <p></p>}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author} <button onClick={handle}> view </button>

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