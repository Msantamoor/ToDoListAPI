const express = require('express');
const cors = require('cors')
require('dotenv').config()

require('./mongo.js')


const app = express();

const PORT = process.env.PORT || 3307;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const { testConnection } = require('./taskDAL.js')
const { createTask } = require('./taskDAL.js')
const { createList }  = require('./taskDAL.js')
const { readTasks } = require('./taskDAL.js')
const { readLists } = require('./taskDAL.js')
const { readTasksById } = require('./taskDAL.js')
const { readTasksByListId } = require('./taskDAL.js')
const { updateTasks } = require('./taskDAL.js')
const { updateTasksComplete } = require('./taskDAL.js')
const { deleteTask } = require('./taskDAL.js')



app.post('/lists', async (req, res) => {
    const newList = req.body
    const list = await createList(newList)
    console.log('A list POST Request was made!');
    res.send(list);
});

app.post('/tasks', async (req, res) => {
    const newTask = req.body
    const task = await createTask(newTask)
    console.log('A task POST Request was made!');
    res.send(task)
});

app.get('/tasks', async (req, res) => {
    let filter = req.query.list
    console.log(filter)
    const tasks = await readTasks(filter)
    console.log('A GET Request was made!');
    res.send(tasks)
});

app.get('/lists', async (req, res) => {
    const lists = await readLists()
    console.log('A GET Request was made!');
    res.send(lists)
});

app.patch('/tasks', async (req, res) => {
    
    console.log('A PATCH Request was made!');
    res.send()
});

app.delete('/tasks', async (req, res) => {
    
    console.log('A DELETE Request was made!');
    res.send()
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}.`));