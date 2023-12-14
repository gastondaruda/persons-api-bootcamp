require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('../models/Person')


//exercise 3.12

const connectDB = (url) => {
    return mongoose.connect(url).then(() => {
        console.log("Connected to MongoDb")
    }).catch(err => {
        console.log('error connecting to MongoDB:', err.message)
    })
}



module.exports = connectDB