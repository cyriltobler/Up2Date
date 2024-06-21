/* eslint-disable no-underscore-dangle */
const getDB = require('../db');

async function getArticlesFromDB(db, user) {
    const { seenArticleIds, language } = user;
    const collection = db.collection('article');
    // const output = await collection.find().sort({ isoDate: -1 }).toArray();
    return collection.aggregate([
        {
            $match: {
                _id: { $nin: seenArticleIds },
                language: { $in: language },
            },
        },
        {
            $sort: { isoDate: -1 },
        },
        {
            $lookup: {
                from: 'channel',
                localField: 'channelFK',
                foreignField: '_id',
                as: 'channelDetails',
            },
        },
        {
            $unwind: '$channelDetails',
        },
        {
            $project: {
                title: 1,
                isoDate: 1,
                link: 1,
                img: 1,
                domain: '$channelDetails.domain',
                channelImg: '$channelDetails.channelImg',
                _id: 1,
            },
        },
        {
            $limit: 20,
        },
    ]).toArray();
}

async function getArticles(req) {
    const userId = req.user._id;

    const db = await getDB();
    const output = await getArticlesFromDB(db, req.user);

    const newSeenIds = output.map((article) => article._id);

    const usersCollection = db.collection('user');
    await usersCollection.updateOne(
        { _id: userId },
        { $push: { seenArticleIds: { $each: newSeenIds } } },
    );
    return output;
}

module.exports = getArticles;
