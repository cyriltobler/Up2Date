const getDB = require('../config/dbConfig');

function getUserInfo(req) {
    const user = {
        email: req.user.email,
        language: req.user.language,
    };

    return user;
}

async function getUserByID(id) {
    const db = await getDB();
    const collection = db.collection('user');
    const user = await collection.findOne({ _id: id });

    return user;
}

async function createUser(user) {
    const { sub, email } = user;

    const newUser = {
        _id: sub,
        email,
        seenArticleIds: [],
    };

    const db = await getDB();
    const collection = db.collection('user');
    await collection.insertOne(newUser);

    return newUser;
}

async function modifyLanguage(_id, language) {
    const db = await getDB();
    const collection = db.collection('user');
    collection.updateOne(
        { _id },
        { $set: { language } },
    );
}

module.exports = {
    getUserInfo,
    getUserByID,
    createUser,
    modifyLanguage,
};
