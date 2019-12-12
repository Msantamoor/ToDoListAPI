const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;

require('dotenv').config()

// Connection URL
const url = process.env.url;

// Database Name
const dbName = 'DataBass';
const settings = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const testConnection = () => {
    const iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                // assert.equal(null, err);
                reject(err)
            } else {
                const db = client.db(dbName);
                // console.log("client", client)
                // console.log("db", db)
                client.close();
                resolve("Connected successfully to server")
            }
        });
    })
    return iou
}


const createTask = (task) => {
    // Use connect method to connect to the server
    let iou = new Promise((resolve, reject) => {

        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            }
            else {
                console.log("Connected to server for Creation of tasks");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDo');
                // Insert a document
                collection.insertOne(task, function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        client.close();
                        resolve("Inserted a task into the collection");
                    }

                });
            }
        })
    });
    return iou
}

const createList = (list) => {
    // Use connect method to connect to the server
    let iou = new Promise((resolve, reject) => {

        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            }
            else {
                console.log("Connected to server for Creation of lists");
                const db = client.db(dbName);
                // Get the lists collection
                const collection = db.collection('ToDoLists');
                // Insert a document
                collection.insertOne(list, function (err, result) {
                     if (err) {
                       reject(err)
                   }
                   else {
                        client.close();
                        resolve("Inserted a list into the collection");
                   }

                 });
            }
        })
    });
    return iou
}

const readTasks = (filter) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log('Connected to server Read tasks');
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDo');
                // Find some documents
                collection.find({ list: filter }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        const results = {
                            data: docs,
                            msg: `Found the following records ${filter}`
                        }

                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}

const readTasksByListId = (id) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server Read tasks by list ID");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoLists');
                // Find some documents
                collection.find({ _id: ObjectId(id) }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        if (docs.length) {
                            const results = docs[0].ToDoLists.map(async (m) => {
                                return await readTaskById(m)
                            })
                            client.close();
                            resolve(results);
                        } else {
                            reject("No List Found")
                        }
                    }
                });
            }
        });
    })
    return iou;
}

const readTasksById = (id) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server Read tasks by ID");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoLists');
                // Find some documents
                collection.find({ _id: ObjectId(id) }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {

                        const results = {
                            data: docs,
                            msg: "Found the following records"
                        }
                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}

const readLists = (id) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server Read Lists");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoLists');
                // Find some documents
                collection.find({}).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        const results = {
                            data: docs,
                            msg: "Found the following records"
                        }

                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}

const readListById = (id) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server Read lists by ID");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoLists');
                // Find some documents
                collection.find({ _id: ObjectId(id) }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {

                        const results = {
                            data: docs,
                            msg: "Found the following records"
                        }
                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}

const updateTasks = (target, filter, task) => {
    let iou = new Promise((resolve, reject) => {

        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            }
            else {
                console.log("Connected to server to Update a Contact");

                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDo');
                // Insert a document
                collection.updateMany({ [target]: filter },
                    { $set: { ...task } },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            client.close();
                            resolve("Updated a document in the collection");
                        }
                    });
            }
        });
    })
    return iou
}

const updateTasksComplete = (id, task) => {
    let iou = new Promise((resolve, reject) => {

        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            }
            else {
                console.log("Connected to server to Update a Contact");

                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDo');
                // Insert a document
                collection.updateMany({ _id: ObjectId(id) },
                    { $set: { completed: !task.completed } },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            client.close();
                            resolve("Updated a document in the collection");
                        }
                    });
            }
        });
    })
    return iou
}

const deleteTask = (name) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server to Delete a Contact");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDo');
                // Insert a document
                collection.deleteMany({ 'name': name },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            client.close();
                            resolve("Delete documents in the collection")
                        }

                    });
            }
        });
    })
    return iou
};


const newTask = {
    "name": "",
    "description": "",
    "due-date": ""
}
const changeTask = {
    "due-date": "6:30"
}
const readTarget = ""
const readFilter = ""

const updateTarget = ""
const updateFilter = ""

module.exports = { testConnection, createTask, createList,  readTasks, readTasksByListId, readTasksById, readLists, readListById, updateTasks, updateTasksComplete, deleteTask, newTask };


//const main = async () => {
//     console.log(await testConnection())
//     console.log('----------------------- Post Test')
//     console.log(await createTask(newTask))
//     console.log('----------------------- Post Create')
//     console.log(await readTasks(readTarget, readFilter))
//     console.log('----------------------- Post Read')
//     console.log(await updateTasks(updateTarget, updateFilter, changeTask))
//     console.log('----------------------- Post Update')
//     //console.log(await deleteTask(''))
//     console.log('----------------------- Post Delete')
//     console.log(await readTasks())
//     console.log('----------------------- Post Read')

// }

// main()