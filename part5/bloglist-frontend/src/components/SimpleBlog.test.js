import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders Content', () => {
  const blog = { title: 'testtitle', author: 'testauthor', likes: 1 }
  const component = render(<SimpleBlog blog={blog} />)
  const titleAuthorElement = component.container.querySelector('.blog-title-author')

  const likesElement = component.container.querySelector('.blog-likes')
  expect(titleAuthorElement).toHaveTextContent('testtitle')
  expect(likesElement).toHaveTextContent('like')

})

test('pressing like twice fires the event twice', () => {
  const mockHandler = jest.fn()
  const { getByText } = render(
    <button onClick={mockHandler}>like</button>
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)

})