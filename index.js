const express = require('express');
const app = express();
const routes = express.Router();

app.use(express.json());

app.use((err, req, res, next) => {
    res.status(400).send(err.message)
  });

const students = [
    {id: 1, name: "Franco", age: 31},
    {id: 2, name: "Juan", age: 15},
    {id: 3, name: "Pedro", age: 25},
    {id: 4, name: "Carlos", age: 18},
    {id: 5, name: "Maria", age: 17},
];

//BaseURL
app.get('/', (req, res) => {
    res.send('NodeJS API Example!')
});

//return all students
app.get('/api/students', (req, res) => {
    res.send(students);
});

//Return specific student
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("The student doesn't exist :(");
    else res.send(student);
});


const port = process.env.port || 80;
app.listen(port, () => console.log('Listen on port 80'));