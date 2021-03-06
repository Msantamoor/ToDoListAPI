const express = require('express');
const cors = require('cors')
const path = require('path')
require('dotenv').config()

require('./mongo.js')


const app = express();

const PORT = process.env.PORT || 3307;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'react')));


const { testConnection } = require('./DataAccessLayer.js')
const { createUser } = require('./DataAccessLayer.js')
const { createTask } = require('./DataAccessLayer.js')
const { createList }  = require('./DataAccessLayer.js')
const { readTasks } = require('./DataAccessLayer.js')
const { readLists } = require('./DataAccessLayer.js')
const { checkPass } = require('./DataAccessLayer.js')
const { check } = require('./DataAccessLayer.js')
const { checkUse } = require('./DataAccessLayer.js')
const { checkEmail } = require('./DataAccessLayer.js')
const { deleteCompletedTasks } = require('./DataAccessLayer.js')
const { deleteList } = require('./DataAccessLayer.js')
const { updateTaskById } = require('./DataAccessLayer.js')
const { deleteTask } = require('./DataAccessLayer.js')
const { checkComplete } = require('./DataAccessLayer.js')
const { deleteListTasks } = require('./DataAccessLayer.js')
const { updateListbyID } = require('./DataAccessLayer.js')
const { updateListAttributes } = require('./DataAccessLayer.js')
const { deleteTasks } = require('./DataAccessLayer.js')



app.post('/users', async (req, res) => {
    const newUser = req.body
    const user = await createUser(newUser)
    console.log('A user POST Request was made');
    res.send(user)
});

app.get('/users-names', async (req,res) => {
    let filter = req.query.username
    console.log(filter)
    const clear = await checkUse(filter)
    console.log(clear)
    res.send(clear)
})

app.get('/users-emails', async (req, res) => {
    let filter = req.query.email
    console.log(filter)
    const clear = await checkEmail(filter)
    console.log(clear)
    res.send(clear)
})

app.get('/users-login', async (req, res) => {
    let filter = req.query.username
    let pass = req.query.password
    console.log(filter)
    const user = await checkPass(filter)
    console.log(user)
    const match = check(user.data[0].password, pass)
    res.send(match)
})

app.post('/lists', async (req, res) => {
    const newList = req.body
    const list = await createList(newList)
    console.log('A list POST Request was made.');
    res.send(list);
})

app.get('/lists', async (req, res) => {
    let filter = req.query.user
    console.log(filter)
    const lists = await readLists(filter)
    console.log('A list GET Request was made');
    res.send(lists)
})

app.patch('/lists', async (req, res) => {
    let user = req.query.user
    let id = req.query.id
    let prevName = req.query.prevName
    let list = req.body.list
    let nameUpdate = req.body.task

    await updateListbyID(id, list)
    console.log('Updated list')
    await updateListAttributes(user, prevName, nameUpdate)
    console.log('Updated list attributes')
    res.send()
})

app.delete('/lists', async (req, res) => {
    let id = req.query.id
    let user = req.query.user
    let list = req.query.list

    await deleteList(id)
    console.log('Deleted List')
    await deleteListTasks(user, list)
    console.log('Deleted corresponding tasks')
    res.send()
})

app.post('/tasks', async (req, res) => {
    const newTask = req.body
    const task = await createTask(newTask)
    console.log('A task POST Request was made.');
    res.send(task)
})

app.get('/tasks', async (req, res) => {
    let filter1 = req.query.user
    let filter2 = req.query.list
    console.log(filter1)
    console.log(filter2)
    const tasks = await readTasks(filter1, filter2)
    console.log('A task GET Request was made');
    res.send(tasks)
})

app.patch('/tasks', async (req, res) => {
    let id = req.query.id
    let task = req.body
    console.log(id)
    console.log(task)
    await updateTaskById(id, task)
    console.log('A PATCH Request was made!');
    res.send()
})

app.delete('/tasks', async (req, res) => {
    let id = req.query.id
    console.log(id)
    await deleteTask(id)
    console.log('A DELETE Request was made!');
    res.send()
})

app.get('/tasks-completed', async (req, res) => {
    let id = req.query.id
    let comp = req.query.completed
    const completed = await checkComplete(id, comp)
    res.send(completed)
})

app.delete('/tasks-completed', async (req, res) => {
    let user = req.query.user
    let list = req.query.list

    await deleteCompletedTasks(user, list)
    console.log('A Done Task DELETE Request was made!');
    res.send()
})

app.delete('/tasks-selected', async (req, res) => {
    let user = req.query.user
    let list = req.query.list
    let names = req.query.names
    console.log(names)
    await deleteTasks(user, list, names)
    console.log('Deleted Selected Tasks')
    res.send()
})

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, './react/', '/'))
})

app.listen(PORT, () => console.log(`Server is up on port ${PORT}.`));