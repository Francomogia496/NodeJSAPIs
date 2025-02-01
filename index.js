const express = require('express');
const app = express();
const routes = express.Router();
const db = require('./db');
const port = 3000;
app.use(express.json());

app.use((err, req, res, next) => {
    res.status(400).send(err.message)
  });

//BaseURL
app.get('/', (req, res) => {
    res.send('NodeJS API Example!')
});

//return all students
app.get('/api/students', async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM student');
        res.json(rows);

    } catch (error) {
        console.log('Error querying the database', error);
        res.status(500).send('Internal Server Error.');
    }
});


//Return specific student
app.get('/api/students/:id', async (req, res) => {

    try {
        const rows = await db.query(`SELECT * FROM student where id = ${req.params.id}`);
        res.json(rows);

    } catch (error) {
        console.log("The student doesn't exist :(", error);
        res.status(500).send('Internal Server Error.');
    }

});

//Add new student method
app.post('/api/students', async (req, res) => {

    try {
        const rows = await db.query(`INSERT INTO student values (${req.body.id}, '${req.body.name}', ${req.body.age})`)
        res.status(200).send('Student added successfully!');
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Internal Server Error');
    }

});

//Delete method
app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));

    if (!student) return res.status(404).send("Student doesn't found!")
    
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

// Start the server
const startServer = async () => {
    await db.connect(); // Connect to the database
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
};
  
startServer();
