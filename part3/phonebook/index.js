const express = require('express');

const app = express();

app.use(express.json())

const PORT = 3001;

const persons = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);
    if(person) {
        response.json(person);
    }else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);
    if(person){
        const updatedPersons = persons.filter(person => person.id !== id);
        persons.length = 0;
        persons.push(...updatedPersons);
        response.status(204).end();
    } else {
        response.status(404).end();
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if(!body.name) {
        return response.status(400).json({
            error: 'name is required'
        })
    }
    if(!body.number) {
        return response.status(400).json({
            error: 'number is required'
        })
    }
    const existingPerson = persons.find(
        person => person.name === body.name
    )
    if(existingPerson) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: String(Math.floor(Math.random()*1000000)),
        name: body.name,
        number: body.number
    }
    persons.push(person);
    response.status(201).json(person)
})

app.get('/info', (request, response) => {
    const currentTime = new Date();
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentTime}</p>   
    `)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})