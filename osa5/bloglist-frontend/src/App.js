import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const blogsWithViews = blogs.map(b => b = { ...b, fullView: false })
      setBlogs(blogsWithViews)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch(error => {
        setErrorMessage(
          'Something went wrong with adding the blog.'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} setNotification={setNotification} />
    </Togglable>
  )

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username &nbsp;
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password &nbsp;
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const toggleFullView = ({ blog }) => {
    const changedBlog = { ...blog, fullView: !blog.fullView }
    const editedBlogs = blogs.map(b => b.id !== changedBlog.id ? b : changedBlog)
    setBlogs(editedBlogs)

  }
  const addLike = ({ blog }) => {
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    blogService
      .update(changedBlog, blog.id)
      .then()
      .catch(error => {
        setErrorMessage(
          'Something went wrong with adding a like.'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    //vastaus täytyy ottaa talteen mutta vain lisätä taas view
    const editedBlogs = blogs.map(b => b.id !== changedBlog.id ? b : changedBlog)
    setBlogs(editedBlogs)

  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Error message={errorMessage} />
      <Notification message={notification} />
      {user.name} logged in &nbsp;
      <button onClick={() => handleLogout()}>logout</button>
      <h2>create new blog </h2>
      {blogForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          toggleFullView={toggleFullView} addLike={addLike}
        />
      )}

    </div>
  )
}

export default App