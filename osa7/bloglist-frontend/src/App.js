import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Notification from './components/Notification'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import Error from './components/Error'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import styled from 'styled-components'

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
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

  const userMatch = useRouteMatch('/users/:id')
  const userToView = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToView = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    /*
        const background = {
          backgroundColor: 'lightblue'
        } */
    const buttonStyle = {
      borderRadius: 8,
    }

    return (
      <Navigation>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in &nbsp;
        <Button onClick={() => handleLogout()}>logout</Button>
      </Navigation>
    )
  }

  if (user === null) {
    return (
      <Page>
        <h2>Blog app</h2>
        <Error message={errorMessage} />
        <h3>log in to application</h3>
        {loginForm()}
      </Page>
    )
  }

  return (
    <Page>
      <Menu />
      <h2>Blog app</h2>

      <Error message={errorMessage} />
      <Notification />
      <p> </p>
      <Switch>

        <Route path="/users/:id">
          <User user={userToView} />
        </Route>

        <Route path="/users">
          <UserList users={users} />
        </Route>

        <Route path="/blogs/:id">
          <Blog blog={blogToView} addLike={addLike} removeBlog={removeBlog} user={user} />
        </Route>

        <Route path="/">
          {blogForm()}
          <h3>blogs</h3>
          {blogs.map(blog =>
            < BlogList key={blog.id} blog={blog}
            />
          )}
        </Route>
      </Switch>
    </Page>
  )
}

const Page = styled.div`
padding:1em;
background: Ivory;
`

const Navigation = styled.div`
paddingRight: 5;
background: Lavender;
`

const Button = styled.button`
background: Ivory;
&:hover{
  background:Plum;
}
border-radius: 3px;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid Plum;
`

export default connect(
  null, { setNotification }
)(App)