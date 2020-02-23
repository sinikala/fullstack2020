import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

//const author = component.container.querySelector('#author')

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const setNotification = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} setNotification={setNotification} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Kinuskikissa leipoo' }
  })

  fireEvent.change(author, {
    target: { value: 'Kinuskikissa' }
  })

  fireEvent.change(url, {
    target: { value: 'www.kinuskikissa.fi' }
  })

  fireEvent.submit(form)

  //component.debug()

  expect(createBlog.mock.calls.length).toBe(1)

  //console.log('mock', createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].title).toBe('Kinuskikissa leipoo')
  expect(createBlog.mock.calls[0][0].author).toBe('Kinuskikissa')
  expect(createBlog.mock.calls[0][0].url).toBe('www.kinuskikissa.fi')
})
