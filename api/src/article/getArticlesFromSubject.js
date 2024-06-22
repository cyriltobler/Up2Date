/* eslint-disable no-underscore-dangle */
const getDB = require('../db');
const setSeenArticles = require('./setSeenArticles');
const getArticle = require('./getArticle');

async function getArticlesFromSubject(req, subject) {
    const { language, _id } = req.user;

    const db = await getDB();

    const filter = {
        $match: {
            language: { $in: language },
            subject,
        },
    };
    const output = await getArticle(db, filter);

    setSeenArticles(db, _id, output);

    return output;
}

module.exports = getArticlesFromSubject;
