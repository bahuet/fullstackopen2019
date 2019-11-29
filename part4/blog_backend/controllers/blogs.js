const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  let allBlogs = await Blog.find({}).populate('user')
  allBlogs = allBlogs.map(b => b.toJSON())
  response.json(allBlogs)
})





blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if ((!blog.title) || (!blog.url)) {
    return response.status(400).end()
  }
  if (!blog.likes) {
    blog.likes = 0
  }

  const token = request.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    blog.user = user.id
    blog.author = user.name
    const savedBlog = await blog.save()

    response.status(201).json(savedBlog.toJSON())
  } catch (e) { next(e) }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    console.log(`blog: =======================${blog.user}`)
    console.log(`decodedToken: =======================${decodedToken.id.toString()}`)

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({ error: 'you are not the author of this blog' })
    } else {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }

  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlogInfo = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, newBlogInfo, { new: true })
  response.json(updatedNote.toJSON())

})

module.exports = blogRouter