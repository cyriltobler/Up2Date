/* eslint-disable no-underscore-dangle */
const getDB = require('../db');
const setSeenArticles = require('./setSeenArticles');
const getArticle = require('./getArticle');

async function getRecommendedArticles(req) {
    const { seenArticleIds, language, _id } = req.user;

    const db = await getDB();

    const filter = {
        $match: {
            language: { $in: language },
            _id: { $nin: seenArticleIds },
        },
    };

    const output = await getArticle(db, filter);

    setSeenArticles(db, _id, output);

    return output;
}

module.exports = getRecommendedArticles;
