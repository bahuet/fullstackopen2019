import React, { useState } from 'react'


const useField = type => {
  const [value, setValue] = useState('')
  const onChange = event => setValue(event.target.value)
  return { type, value, onChange }
}

const LoginForm = ({ handleLogin }) => {
  const username = useField('text')
  const password = useField('password')
  const handleClick = e => {
    e.preventDefault()
    let event = { target: { value: '' } }
    password.onChange(event)
    handleLogin({ username: username.value, password: password.value })
  }
  return (
    <form onSubmit={handleClick} className='loginForm'>
      <div>
        username
        <input
          {...username}
        />
      </div>
      <div>
        password
        <input
          {...password}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm