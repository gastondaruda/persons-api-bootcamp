require('./')
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./db/mongo')
const Person = require('./models/Person')
const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')

app.use(cors())
app.use(express.json())
//exercise 3.7
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    })
    
    //exercise 3.1
app.get('/api/persons', (req, res) => {
    
    Person.find({}).then(person => {
        res.json(person)
    })
    //mongoose.connection.close()
})

//exercise 3.2
app.get('/info', (req, res) => {
    const request_date = new Date()
        res.send(`
                <div>
                    <p>Phonebook has info for ${peopleArr.length} peopleArr</p>
                    <p>${request_date}</p>
                </div>
                    `)
})


//exercise 3.3
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    
    Person.findById(id)
        .then(person => {
            if(person){

                res.json(person)
            }else {
                res.status(404).end()
            }
        })
        .catch(err => {
            next(err)
        })
})

//exercise 3.4
app.delete('/api/persons/:id', (req, res, next) => {
    const {id} = req.params
    
    Person.findByIdAndDelete(id).then(result => {
        res.status(204).end()
    }).catch(err => {
        next(err)
    })
})

//exercise 3.19
app.post('/api/persons', (req,res) => {
    const person = req.body

    if (!person) {
        return res.status(400).json({ err: "error content" })
    }

    
    const newPerson = new Person({
        name: person.name,
        number: person.number
    })

    Person.find({name: newPerson.name}).then(person => {
        if(person.length === 0){
            newPerson.save().then(savedPerson => {
                res.json(savedPerson)
            })
        } else{
            res.json("This person already exist...")
        } 
    })

    
    })

//update-------------------------
app.put('/api/persons/:id', (req, res, next) => {
    const {id} = req.params
    const person = req.body

    const updatePerson = {
        name: person.name,
        number: person.number
    }

    Person.findByIdAndUpdate(id, updatePerson, {new:true})
    .then(result => {
        res.json(result)
    })
})

app.use(notFound)
app.use(handleError)

const start = async () => {
    try{
        connectDB(process.env.MONGO_URI)
        app.listen(process.env.PORT, console.log(`Server is listening port ${process.env.PORT}...`))
    }catch(err){
        console.log(err)
    }
}

start()

//{} []