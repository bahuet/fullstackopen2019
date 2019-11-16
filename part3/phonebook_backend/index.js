console.log('sup W')
require('dotenv').config()
const Contact = require('./models/contact')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
var morgan = require('morgan')
app.use(express.static('build'))


app.use(bodyParser.json())
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)



morgan.token('data', (req, res) => { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!221</h1>')
})

// app.get('/info', (req, res) => {
//   const output = (
//     `<div> <p> Phone book has info for ${persons.length} persons </p>
//     <p> ${Date()}</p>
//     </div>`      )
//   res.send(output)
// })

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(persons => {
    res.json(persons.map(p => p.toJSON()))
  })
})


app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(204).end()
      }
    })

    .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.num) {
    return res.status(400).json({ error: 'Name or number missing' })
  }

  const person = new Contact({
    name: body.name,
    num: body.num,
  })

  person.save().then(savedContact => savedContact.toJSON())
    .then(savedAndFormattedNote => { res.json(savedAndFormattedNote) })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    num: body.num,
  }
  Contact.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedContact => {
      response.json(updatedContact.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(`error message: ${error.message}`)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })

  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})