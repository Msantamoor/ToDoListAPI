const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

// Connection URL
const url = process.env.url;

// Database Name
const connector = () => {
    //const url = process.env;
    return MongoClient.connect(url, {

    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
    })
}

module.exports = connector;