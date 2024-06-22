function getArticle(db, filter) {
    const collection = db.collection('article');

    return collection.aggregate([
        filter,
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

module.exports = getArticle;
