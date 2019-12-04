import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
import '@testing-library/jest-dom/extend-expect'


describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    const loggedInDisplayDiv = component.container.querySelector('.loggedInDisplay')
    const loginFormDiv = component.container.querySelector('.loginForm')

    expect(loggedInDisplayDiv).toBeNull()
    expect(loginFormDiv).toHaveTextContent('login')

  })

  test('if logged in, blogs are  rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('SuperBlog0TESTTOKEN')
    )


    component.debug()

    const loggedInDisplayDiv = component.container.querySelector('.loggedInDisplay')

    expect(loggedInDisplayDiv).toHaveTextContent('SuperBlog0TESTTOKEN222224')

  })
})