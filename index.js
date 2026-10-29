const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.json())
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/info", (request, response) => {
   const time = new Date()
   const numPersons = persons.length
   const reply = `<p>Phonebook has info for ${persons.length}</p>
   				<p>${time}</p>`
  response.send(reply);
});

app.get("/api/persons/:id", (request,response)=>{
	const id = request.params.id
	const person = persons.find((person)=> person.id === id)
	if(!person){
		response.status(404)
		return response.send(`<p>Could not find a persons with id ${id}</p>`)
	}
	response.json(person)
})

app.delete("/api/persons/:id", (request,response)=>{
	const id = request.params.id
	persons = persons.filter((person) => person.id!==id)

	response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
	
	let newPerson  = {
		name : request.body.name,
		number : request.body.number
	}
	console.log(newPerson.name)
	console.log(newPerson.number)
	if(!newPerson.name || !newPerson.number){
		response.status(400)
		return response.json({
			message : "missing name and/or person" 
		})
	}
	if(persons.some((person)=> person.name === newPerson.name)){
		response.status(400)
		return response.json({
			error: "name already exists in phonebook"
		})
	}
	newPerson.id = String(Math.trunc(Math.random()*10000))
	persons = persons.concat(newPerson)
	response.status(200)
	response.json(newPerson)
})