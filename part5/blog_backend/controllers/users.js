const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.get('/', async (request, response) => {

  const users = await User.find({})
  response.json(users)
})


userRouter.post('/', async (request, response, next) => {
  try {

    const body = request.body
    const saltRounds = 10
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'password too short' })
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)


  } catch (e) { next(e) }

})

module.exports = userRouter