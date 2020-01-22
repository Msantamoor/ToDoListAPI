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

const createUser = (user) => {
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
                const collection = db.collection('ToDoUsers');
                // Insert a document
                collection.insertOne(user, function (err, result) {
                     if (err) {
                       reject(err)
                   }
                   else {
                        client.close();
                        resolve("Inserted a user into the collection");
                   }

                 });
            }
        })
    });
    return iou
}

const readTasks = (user, list) => {
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
                collection.find({ $and: [{user: { $eq: user }}, {list: { $eq: list }}] }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        const results = {
                            data: docs,
                            msg: `Found the following records`
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

const checkComplete = (filter1, filter2) => {
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
                collection.find({ $and: [{ _id: { $eq: ObjectId(filter1) }}, {completed: { $eq: filter2 }}] }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else if(docs.length > 0){
                        client.close();
                        resolve(true);
                    } else if(docs.length === 0){
                        client.close();
                        resolve(false);
                    }
                });
            }
        });
    })
    return iou;
}

const check = (check1, check2) => {
    if(check1 === check2){
        return true;
    } else {
        return false;
    }
}

const checkPass = (username) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log('Connected to server Read tasks');
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoUsers');
                // Find some documents
                collection.find({ username: username }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        const results = {
                            data: docs,
                            msg: `Found the following records`
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


const checkUse = (username) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log('Connected to server Read tasks');
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoUsers');
                // Find some documents
                collection.find({ username: username }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else if(docs.length === 0){
                        client.close();
                        resolve(true);
                    } else if(docs.length > 0){
                        client.close();
                        resolve(false)
                    }
                });
            }
        });
    })
    return iou;
}

const checkEmail = (email) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log('Connected to server Read tasks');
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoUsers');
                // Find some documents
                collection.find({ email: email }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else if(docs.length === 0){
                        client.close();
                        resolve(true);
                    } else if(docs.length > 0){
                        client.close();
                        resolve(false)
                    }
                });
            }
        });
    })
    return iou;
}

const readLists = (name) => {
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
                collection.find({ user: name}).toArray(function (err, docs) {
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

const updateTaskById = (id, task) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server Read lists by ID");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDo');
                // Find some documents
                collection.updateOne({ _id: ObjectId(id) },
                { $set: { ...task } },
                (function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close();
                        resolve("Updated a document in the collection");
                    }
                }))
            }
        });
    })
    return iou;
}

const updateListbyID = (id, list) => {
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
                collection.updateOne({ _id: ObjectId(id) },
                { $set: { ...list } },
                (function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close();
                        resolve("Updated a document in the collection");
                    }
                }))
            }
        });
    })
    return iou;
}

const updateListAttributes = (user, list, taskUpdate) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server Read lists by ID");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDo');
                // Find some documents
                collection.updateMany({ $and: [ {user: { $eq: user }}, {list: {$eq: list}} ] },
                { $set: { ...taskUpdate } },
                (function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close();
                        resolve("Updated a document in the collection");
                    }
                }))
            }
        });
    })
    return iou;
}


const deleteTask = (id) => {
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
                collection.deleteOne({ _id: ObjectId(id) },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            client.close();
                            resolve("Deleted a document in the collection")
                        }

                    });
            }
        });
    })
    return iou
};

const deleteTasks = (user, list, selectedTasks) => {
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
                console.log(selectedTasks)
                collection.deleteMany({ $and: [ {user: { $eq: user}}, {list: { $eq: list}}, { name: { $in: (selectedTasks)} } ] },
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


const deleteCompletedTasks = (user, list) => {
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
                collection.deleteMany({ $and: [{user: { $eq: user }}, {list: { $eq: list }}, {completed: {$eq: "true"}}] },
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

const deleteList = (id) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server to Delete a Contact");
                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoLists');
                // Insert a document
                collection.deleteOne({ _id: ObjectId(id) },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            client.close();
                            resolve("Deleted a document in the collection")
                        }

                    });
            }
        });
    })
    return iou
};

const deleteListTasks = (user, list) => {
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
                collection.deleteMany({ $and: [{user: { $eq: user }}, {list: { $eq: list }}] },
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


module.exports = { testConnection, createTask, createList, createUser, readTasks, checkComplete, checkPass, checkUse, checkEmail, check, deleteTask, deleteTasks, deleteCompletedTasks, deleteList, deleteListTasks, readLists, updateTaskById, updateListbyID, updateListAttributes };
