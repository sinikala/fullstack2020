import React, { useState } from 'react'
//import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, setNotification }) => {
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
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
    setNotification(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title: &nbsp;
          <input
            value={title}
            onChange={handleTitleChange}
          /></div>
        <div>
          author: &nbsp;
          <input
            value={author}
            onChange={handleAuthorChange}
          /></div>
        <div>
          url: &nbsp;
          <input
            value={url}
            onChange={handleUrlChange}
          /></div>
        <button type="submit">add new blog</button>
      </form>
    </div>
  )
}

/*
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

*/
export default BlogForm