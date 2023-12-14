const {Schema, model} = require('mongoose')

const personSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
        unique: true 
        
    },
    number: {
        type: String,
        required: [true, "Please enter a number"],
    }
})

const Person = model('Person', personSchema)

module.exports = Person