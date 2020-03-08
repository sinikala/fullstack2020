import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'


const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
    props.setNotification(`a new blog ${title} by ${author} added`, 5)
  }

  return (
    <div>
      <h2>create new blog </h2>
      <form onSubmit={addBlog}>
        <div>
          title: &nbsp;
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          /></div>
        <div>
          author: &nbsp;
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          /></div>
        <div>
          url: &nbsp;
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          /></div>
        <button id='submit-blog' type="submit">add new blog</button>
      </form>
    </div>
  )
}


export default connect(
  null,
  { setNotification }
)(BlogForm)
//export default BlogForm