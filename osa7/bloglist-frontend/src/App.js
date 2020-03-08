import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import Togglable from './components/Togglable'
import Error from './components/Error'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"


const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => { return b.likes - a.likes })
      setBlogs(blogs)
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

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
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
      .catch(() => {
        setErrorMessage(
          'Something went wrong with adding the blog.'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (blogObject) => {
    blogService
      .remove(blogObject)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== blogObject.id))
        props.setNotification('Succesfully deleted', 5)
      })
      .catch(() => {
        setErrorMessage(
          `The blog you are trying to delete was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username &nbsp;
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password &nbsp;
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const addLike = ({ blog }) => {
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogService
      .update(changedBlog, blog.id)
      .then(returnedBlog => {
        const editedBlogs = blogs.map(b => b.id !== blog.id ? b : returnedBlog)
        setBlogs(editedBlogs)
      })
      .catch(() => {
        setErrorMessage(
          'Something went wrong with adding a like.'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Blog app</h2>
        <Error message={errorMessage} />
        <h3>log in to application</h3>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      {user.name} logged in &nbsp;
      <button onClick={() => handleLogout()}>logout</button>
      <Error message={errorMessage} />
      <Notification />
      <p> </p>
      <Switch>
        <Route path="/users">
          <UserList users={users} />
        </Route>
        <Route path="/">
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}
              addLike={addLike} removeBlog={removeBlog} user={user}
            />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default connect(
  null, { setNotification }
)(App)