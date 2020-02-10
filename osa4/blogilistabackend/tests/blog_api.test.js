const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContainEqual(
    'React patterns'
  )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Harpunsoittajan vaimo",
    author: "Antti Holma",
    url: "https://www.harpunsoittajanvaimo.fi/",
    likes: 17
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(contents).toContain(
    'Harpunsoittajan vaimo'
  )
})

describe('undefined', () => {
  test('likes is set to 0 on save', async () => {
    const newBlogUndefinedLikes = {
      title: "Colour me",
      author: "Anni",
      url: "https://www.colourme.fi/"
    }

    await api
      .post('/api/blogs')
      .send(newBlogUndefinedLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.likes)
    expect(contents[2]).toBe(0)

  })

  test('title returns 400 Bad request on save', async () => {
    const newBlogUndefinedTitle = {
      author: "Mystery Man",
      url: "https://www.wheresthetitle.fi/",
      likes: 500
    }

    await api
      .post('/api/blogs')
      .send(newBlogUndefinedTitle)
      .expect(400)
  })

  test('url returns 400 Bad request on save', async () => {
    const newBlogUndefinedTitle = {
      title: "Stephan Kesting",
      author: "Grappling Arts",
      likes: 39
    }

    await api
      .post('/api/blogs')
      .send(newBlogUndefinedTitle)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})