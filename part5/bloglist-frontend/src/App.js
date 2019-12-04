import React, { useState, useEffect } from 'react'
import './App.css';
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import Blog from './components/Blog'


function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [notifMessage, setNotifMessage] = useState('')
  const [notifType, setNotifType] = useState('')
  const [id, setId] = useState('')


  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }


  }, [])

  const handleLogin = async ({ username, password }) => {


    console.log(`logging in with username ${username} and password ${password} and id ${id}`)
    try {

      const user = await loginService.login({ username, password, id })
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      console.log(user)
      setUser(user)


      setNotifType('sucess')
      setNotifMessage('Logged in sucessfully')
      setId(id)
      setTimeout(() => {
        setNotifMessage(null)
        setNotifType(null)
      }, 5000)

    } catch (e) {
      console.log(`error: ${e}`)
      setNotifType('error')
      setNotifMessage('failed to log in')
      setTimeout(() => {
        setNotifMessage(null)
        setNotifType(null)
      }, 5000)
    }

  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log(`posting blog with title ${newTitle} and url ${newUrl}`)
    const newObject = { title: newTitle, url: newUrl }
    blogService.create(newObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewTitle('')
        setNewUrl('')
        setNotifType('sucess')
        setNotifMessage('Blog added sucessfully')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 5000)
      })
      .catch(e => {
        setNotifType('error')
        setNotifMessage('failed to add blog')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 5000)
      })
  }


  const blogForm = () => (
    <BlogForm onSubmit={addBlog}
      onTitleChange={({ target }) => setNewTitle(target.value)}
      onUrlChange={({ target }) => setNewUrl(target.value)}
      newTitle={newTitle}
      newUrl={newUrl} />
  )

  const logout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
    setNotifType('sucess')
    setNotifMessage('loggout successful')
    setId('')
    setTimeout(() => {
      setNotifMessage(null)
      setNotifType(null)
    }, 5000)
  }

  const handleLikeClick = blog => {
    const updatedObject = { ...blog, likes: blog.likes + 1 }
    blogService.update(updatedObject)
      .then(data => {
        const newBlogs = blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b)
        setBlogs(newBlogs)
        setNotifType('sucess')
        setNotifMessage('Liked!')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 500)
      })
      .catch(e => {
        setNotifType('error')
        setNotifMessage('failed to like')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 5000)
      })
  }


  const handleDeleteBlog = id => {
    blogService.deleteBlog(id)
      .then(data => {
        const newBlogs = blogs.filter(b => b.id !== id)
        setBlogs(newBlogs)
        setNotifType('sucess')
        setNotifMessage('Blog deleted!')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 500)
      })
      .catch(e => {
        setNotifType('error')
        setNotifMessage('failed to delete')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 5000)
      })


  }

  const loggedInDisplay = () => {
    return (
      <div className='loggedInDisplay'>
        <p> {user.name} logged in </p> <button onClick={logout}>Logout</button>
        <Toggable buttonLabel='Display new Blog form'>        {blogForm()}        </Toggable>
        <ul>{blogs.sort((a, b) => b.likes - a.likes).map((b, i) => <li key={b.title + b.url + b.author + i}><Blog blog={b} handleDeleteClick={handleDeleteBlog} handleLikeClick={handleLikeClick} user={user} /></li>)}</ul>
      </div>
    )
  }



  return (
    <>
      <Notification message={notifMessage} type={notifType} />
      {user === null ?
        <LoginForm handleLogin={handleLogin} /> :
        loggedInDisplay()
      }

    </>

  );
}


export default App
