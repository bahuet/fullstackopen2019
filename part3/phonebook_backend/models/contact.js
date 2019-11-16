const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log(`error connecting to MongoDB: ${error.message}`)
  })

const contactSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, unique: true, required: true },
  num: { type: String, minlength: 8, required: true },
})
contactSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })


contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)