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
const { createUser } = require('./taskDAL.js')
const { createTask } = require('./taskDAL.js')
const { createList }  = require('./taskDAL.js')
const { readTasks } = require('./taskDAL.js')
const { readLists } = require('./taskDAL.js')
const { checkPass } = require('./taskDAL.js')
const { check } = require('./taskDAL.js')
const { checkUse } = require('./taskDAL.js')
const { checkEmail } = require('./taskDAL.js')
const { deleteCompletedTasks } = require('./taskDAL.js')
const { deleteList } = require('./taskDAL.js')
const { updateTaskById } = require('./taskDAL.js')
const { deleteTask } = require('./taskDAL.js')
const { checkComplete } = require('./taskDAL.js')
const { deleteListTasks } = require('./taskDAL.js')
const { updateListbyID } = require('./taskDAL.js')
const { updateListAttributes } = require('./taskDAL.js')
const { deleteTasks } = require('./taskDAL.js')





app.post('/lists', async (req, res) => {
    const newList = req.body
    const list = await createList(newList)
    console.log('A list POST Request was made.');
    res.send(list);
});

app.post('/tasks', async (req, res) => {
    const newTask = req.body
    const task = await createTask(newTask)
    console.log('A task POST Request was made.');
    res.send(task)
});

app.post('/users', async (req, res) => {
    const newUser = req.body
    const user = await createUser(newUser)
    console.log('A user POST Request was made');
    res.send(user)
});

app.get('/tasks', async (req, res) => {
    let filter1 = req.query.user.toString()
    let filter2 = req.query.list.toString()
    console.log(filter1)
    console.log(filter2)
    const tasks = await readTasks(filter1, filter2)
    console.log('A task GET Request was made');
    res.send(tasks)
});

app.get('/lists', async (req, res) => {
    let filter = req.query.user.toString()
    const lists = await readLists(filter)
    console.log('A list GET Request was made');
    res.send(lists)
});

app.get('/colortheme', async (req, res) => {
    let filter = req.query.username
    let pass = req.query.password
    console.log(filter)
    const user = await checkPass(filter)
    console.log(user)
    const match = check(user.data[0].password, pass)
    res.send(match)
    }
);

app.get('/textfont', async (req,res) => {
    let filter = req.query.username
    console.log(filter)
    const clear = await checkUse(filter)
    console.log(clear)
    res.send(clear)
    }
)

app.get('/textcolor', async (req, res) => {
    let filter = req.query.email
    console.log(filter)
    const clear = await checkEmail(filter)
    console.log(clear)
    res.send(clear)
    }
)

app.get('/completion', async (req, res) => {
    let id = req.query.id.toString()
    let comp = req.query.completed.toString()
    const completed = await checkComplete(id, comp)
    res.send(completed)

})

app.patch('/tasks', async (req, res) => {
    let id = req.body.params.id
    let task = req.body.params.task
    console.log(id)
    console.log(task)
    await updateTaskById(id, task)
    console.log('A PATCH Request was made!');
    res.send()
});

app.patch('/list', async (req, res) => {
    let user = req.body.params.user
    let id = req.body.params.id
    let list = req.body.params.list
    let prevName = req.body.params.prevName
    let nameUpdate = req.body.params.nameUpdate

    await updateListbyID(id, list)
    console.log('Updated list')
    await updateListAttributes(user, prevName, nameUpdate)
    console.log('Updated list attributes')
    res.send()

})

app.delete('/tasks', async (req, res) => {
    let id = req.query.id
    console.log(id)
    await deleteTask(id)
    console.log('A DELETE Request was made!');
    res.send()
});

app.delete('/tasksdone', async (req, res) => {
    let user = req.query.user.toString()
    let list = req.query.list.toString()

    await deleteCompletedTasks(user, list)
    console.log('A Done Task DELETE Request was made!');
    res.send()
});

app.delete('/list', async (req, res) => {
    let id = req.query.id
    let user = req.query.user.toString()
    let list = req.query.list.toString()

    await deleteList(id)
    console.log('Deleted List')
    await deleteListTasks(user, list)
    console.log('Deleted corresponding tasks')
    res.send()

})

app.delete('/selecttasks', async (req, res) => {
    let user = req.query.user
    let list = req.query.list
    let names = req.query.names
    console.log(names)
    await deleteTasks(user, list, names)
    console.log('Deleted Selected Tasks')
    res.send()

})

app.listen(PORT, () => console.log(`Server is up on port ${PORT}.`));