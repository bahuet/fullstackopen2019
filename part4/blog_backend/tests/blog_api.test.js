const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const newBlog = helper.listWithOneBlog[0]


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObjects = helper.initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

describe('Basic blog content tests', () => {


  test('blogs are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('blogs have an "id" identififier', async () => {

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const addedNote = blogsAtEnd.find(n => n.title === newBlog.title)
    expect(addedNote.id).toBeDefined()
  })
})

describe('blog entry tests', () => {

  test('no url blog post gets rejected 400', async () => {
    const noUrlBlog = {
      title: "jogn",
      author: "123",
    }

    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)
  })

  test('news blogs can be posted', async () => {

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length === helper.initialBlogs.length + 1)
    const addedNote = blogsAtEnd.find(n => n.title === newBlog.title)
    expect(addedNote.author).toEqual(newBlog.author)
    expect(addedNote.likes).toEqual(newBlog.likes)
    expect(addedNote.title).toEqual(newBlog.title)
    expect(addedNote.url).toEqual(newBlog.url)
  })

  test('likes gets initiated with "1" ', async () => {
    const noLikesBlog = {
      title: "nolikes",
      author: "fsdsdaf",
      url: "sfdasadffadsafdsafdsfdsaafds",
    }

    await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const addedNote = blogsAtEnd.find(n => n.title === noLikesBlog.title)
    expect(addedNote.likes).toBe(0)
  })
})


describe('operations on existing blog entries', () => {

  test('blogs can be updated', async () => {
    const blogWithNewUrl =
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "NEWLINK.COM",
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blogToUpdateId = blogToUpdate.id

    await api
      .put(`/api/blogs/${blogToUpdateId}`)
      .send(blogWithNewUrl)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const updatedBlog = blogsAtEnd.find(n => n.id === blogToUpdateId)
    expect(updatedBlog.url).toBe(blogWithNewUrl.url)
  })

  test('deletes with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const test3 = await helper.blogsInDb()
    expect(test3.length).toBe(
      blogsAtStart.length - 1
    )

    const contents = test3.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

  test('no title blog post gets rejected 400', async () => {
    const noTitleBlog = {
      author: "123",
      url: "123321",
    }

    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)
  })
})



afterAll(() => {
  mongoose.connection.close()
})