const mongoose = require('mongoose')

if (process.argv < 3) {
  console.log('need password')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://admin001:${password}@cluster0-yjwba.mongodb.net/contacts?retryWrites=true&w=majority`
const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
})
const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {

  mongoose.connect(url, { useNewUrlParser: true })
  Contact.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(n => {
      console.log(n)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 5) {

  mongoose.connect(url, { useNewUrlParser: true })

  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })
  contact.save().then(response => {
    console.log(`added ${contact.name} to the phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('wrong number of arguments')
  process.exit(1)
}


