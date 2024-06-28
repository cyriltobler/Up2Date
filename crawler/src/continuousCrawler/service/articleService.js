/* eslint-disable no-underscore-dangle */
const getDB = require('../../dbConfig');
const categoryService = require('./categoryService');
const imgService = require('./imgService');

function getIdFromArticle(guid, feed) {
    const url = new URL(feed.url);
    const { hostname } = url;
    const domain = hostname.split('.').slice(-2).join('.');
    return `${domain}-${guid}`;
}

async function getArticleById(guid) {
    const db = await getDB();
    const collection = db.collection('article');

    return collection.findOne({ _id: guid });
}

async function insertArticle(preparedArtikel) {
    const db = await getDB();
    const collection = db.collection('article');

    await collection.updateOne(
        { _id: preparedArtikel._id },
        { $set: preparedArtikel },
        { upsert: true },
    );
}

async function createArticleObject(article, feedObject, channel, guid) {
    const subject = await categoryService.getCategory({
        title: article.title,
        link: article.link,
        description: article.contentSnippet,
    });

    const preparedArtikel = {
        _id: guid,
        title: article.title,
        link: article.link,
        description: article.contentSnippet,
        img: imgService.getImgFromArticle(article),
        isoDate: article.isoDate,
        language: feedObject.language,
        subject,
        channelFK: channel._id,
    };

    await insertArticle(preparedArtikel);
}

module.exports = { getIdFromArticle, getArticleById, createArticleObject };
