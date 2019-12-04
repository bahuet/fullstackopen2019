import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = { title: 'testtitle', author: 'testauthor', url: 'testurl', likes: 1, id: 'testid', user: { id: 'userid' } }
  const user = { id: 'userid' }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'testtitle'
    )
  })

  test('at start url is not displayed', () => {
    const div = component.container.querySelector('.moreInfo')
    expect(div).toBeNull()
  })

  test('moreinfo gets displayed if component is clicked', () => {

    const elem = component.container.querySelector('.basicInfo')

    fireEvent.click(elem)
    const div = component.container.querySelector('.moreInfo')
    expect(div).toHaveTextContent('url: testurl')
  })

})
