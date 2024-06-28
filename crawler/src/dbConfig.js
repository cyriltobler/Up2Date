const { MongoClient } = require('mongodb');
require('dotenv').config();

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
if (!password || !username) throw new Error('DB password or username is undefined.');

const url = `mongodb://${username}:${password}@localhost:27017`;

let client;

async function getDB() {
    if (!client) {
        client = new MongoClient(url);
        await client.connect();
    }
    return client.db('app');
}

module.exports = getDB;
