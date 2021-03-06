import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders only blog title and author', () => {
  const blog = {
    title: 'Testing Diaries',
    author: 'Keith Hammings',
    url: 'testingdiaries.com',
    likes: 30
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing Diaries'
  )
  expect(component.container).toHaveTextContent(
    'Keith Hammings'
  )
  expect(component.container).not.toHaveTextContent(
    'testingdiaries.com'
  )
  expect(component.container).not.toHaveTextContent(
    '30'
  )
})


test('renders url and likes after view button is clicked', () => {
  const blog = {
    title: 'Testing Diaries',
    author: 'Keith Hammings',
    url: 'testingdiaries.com',
    likes: 30,
    user: {
      name: 'Matt'
    }

  }
  const user = { name: 'Matt' }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)


  expect(component.container).toHaveTextContent(
    'testingdiaries.com'
  )

  expect(component.container).toHaveTextContent(
    '30'
  )
})


test('clicking like twice calls the handler twice', () => {
  const blog = {
    title: 'Testing Diaries',
    author: 'Keith Hammings',
    url: 'testingdiaries.com',
    likes: 30,
    user: {
      name: 'Matt'
    }
  }
  const user = { name: 'Matt' }

  const mockLike = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} user={user} addLike={mockLike} />
  )

  fireEvent.click(getByText('view'))
  fireEvent.click(getByText('like'))
  fireEvent.click(getByText('like'))
  expect(mockLike.mock.calls.length).toBe(2)
})

