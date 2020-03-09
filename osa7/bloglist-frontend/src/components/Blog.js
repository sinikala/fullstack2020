import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useHistory,
} from "react-router-dom"


const Blog = ({ blog, addLike, removeBlog, user }) => {
  const history = useHistory()

  if (!blog) {
    return null
  }

  const like = () => {
    addLike({ blog })
  }

  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
      history.push('/')
    }
  }


  return (
    <BlogStyle className='blog'>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      likes: {blog.likes} <button onClick={like}> like </button><br />
      added by: {blog.user.name} <br />
      {blog.user.username === user.username
        ? <button id='remove-button' onClick={remove}> remove </button>
        : <p></p>}
    </BlogStyle>
  )

}

Blog.propTypes = {
  //buttonLabel: PropTypes.string.isRequired
  removeBlog: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired
}

const BlogStyle = styled.div`
border-radius: 3px;
padding: 0.5em 1em;
border: 1px solid Plum;
margin: 0.5em;
`

export default Blog


