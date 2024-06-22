/* eslint-disable no-underscore-dangle */
const getDB = require('../config/dbConfig');
const queries = require('./queries');

async function getArticlesByFilter(filter) {
    const query = queries.getArticleQuery(filter);

    const db = await getDB();
    const collection = db.collection('article');
    const articles = await collection.aggregate(query).toArray();

    return articles;
}

async function setSeenArticles(articles, userId) {
    const newSeenIds = articles.map((article) => article._id);

    const db = await getDB();
    const usersCollection = db.collection('user');
    return usersCollection.updateOne(
        { _id: userId },
        { $push: { seenArticleIds: { $each: newSeenIds } } },
    );
}

function getRecommendedArticles(seenArticleIds, language) {
    const filter = {
        $match: {
            language: { $in: language },
            _id: { $nin: seenArticleIds },
        },
    };

    return getArticlesByFilter(filter);
}

function getArticlesBySubject(seenArticleIds, language, subject) {
    const filter = {
        $match: {
            language: { $in: language },
            subject,
            _id: { $nin: seenArticleIds },
        },
    };

    return getArticlesByFilter(filter);
}

module.exports = { setSeenArticles, getRecommendedArticles, getArticlesBySubject };
