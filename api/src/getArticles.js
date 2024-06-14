const getDB = require('./db');

async function getArticles() {
    const db = await getDB();
    const collection = db.collection('article');
    // const output = await collection.find().sort({ isoDate: -1 }).toArray();
    const output = await collection.aggregate([
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
                _id: 0,
            },
        },
    ]).toArray();
    return output;
}

module.exports = getArticles;
