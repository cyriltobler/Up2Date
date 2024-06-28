const getDB = require('../../dbConfig');

async function getNextChannel(lastId) {
    const db = await getDB();
    const collection = db.collection('channel');
    const query = lastId ? { _id: { $gt: lastId } } : {};
    const channel = await collection.findOne(query);

    return channel;
}

module.exports = { getNextChannel };
