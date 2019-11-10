console.log('sup W')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.json())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

let persons =
    [
        {
            name: "Mary Poppendieck",
            num: "39-23-6423122",
            "id": 1
        },
        {
            name: "asdf",
            num: "123",
            id: 2
        },
        {
            name: "gdfdgfsdsgf",
            num: "3432432324",
            id: 4
        },
        {
            name: "jhyhgfj fdghfdhghdfg",
            num: "5555555555555",
            id: 5
        }
    ]

morgan.token('data', (req, res) => { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!221</h1>')
})

app.get('/info', (req, res) => {
    const output = (
        `<div> <p> Phone book has info for ${persons.length} persons </p> 
    <p> ${Date()}</p>
    </div>`      )
    res.send(output)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id != id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.num) {
        return res.status(400).json({ error: "Name or number missing" })
    }

    if (persons.find(p => p.name.toUpperCase() === body.name.toUpperCase())) {
        return res.status(400).json({ error: "This person is already in the phonebook database" })
    }

    const person = {
        name: body.name,
        num: body.num,
        id: generateID()
    }

    persons = persons.concat(person)
    res.json(person)

})

const generateID = () => {
    const randomID = () => Math.floor(Math.random() * 100)
    let id
    do { id = randomID() }
    while (persons.some(p => p.id === id))
    return id

}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})