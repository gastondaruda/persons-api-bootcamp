const express = require('express')
const app = express()
//let persons = require('./db')
const PORT = process.env.PORT ||3001
var morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
//exercise 3.7
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


//let personArr = persons.persons

let persons = [
    {
    name: "Arto Hella",
    number: "040-123456",
    id: 1
    },
    {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
    },
    {name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
    },
    {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
    },
    {
    name: "Gasty",
    number: "789",
    id: 6
    },
    {
    name: "Guada",
    number: "555",
    id: 7
    }
]


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    })
    
    //exercise 3.1
app.get('/api/persons', (req, res) => {
    res.json(persons)
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
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    person = persons.find(p => p.id === id)

    if(person) {
        res.send(person)
    } else {
        return res.status(400).json({ 
            error: 'error, exercise 3.6' 
        })
    }
})

//exercise 3.4
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    console.log(persons)
    res.status(204).end()
})

//exercise 3.5
app.post('/api/persons', (req,res) => {
    const person = req.body

    console.log("index.js")
    const ids = persons.map(p => p.id)
    const maxId = Math.max(...ids)

    let nameExist = persons.find(person => person.name === person.name)
    const newPerson = {
        name: person.name,
        number: person.number,
        id: maxId + 1,
        content: person.content
    }
    persons = [...persons, newPerson]
    res.status(200).send(persons)
    //console.log(persons)


    /*if(person.name === "" || person.number === "" || nameExist){
        return res.status(400).json({ 
            error: 'error, exercise 3.6' 
        })
    }else {  
        const newPerson = {
            name: person.name,
            number: person.number,
            id: maxId + 1,
            content: person.content
        }
        
        console.log(newPerson)
        persons = [...persons,newPerson]
        
    */
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


//{} []