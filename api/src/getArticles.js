const getDB = require('./db');

async function getArticles() {
    const db = await getDB();
    const collection = db.collection('article');
    const output = await collection.find().limit(5).toArray();
    return output;
}

module.exports = getArticles;
