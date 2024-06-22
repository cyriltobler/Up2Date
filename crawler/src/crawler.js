/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const getDB = require('./db');
const crawlArticle = require('./crawlArticle');

async function fetchArticlesInBatches() {
    console.log('Start fetching all feeds');

    const db = await getDB();
    const collection = db.collection('channel');

    let lastId = null;

    while (true) {
        const query = lastId ? { _id: { $gt: lastId } } : {};
        const channel = await collection.findOne(query);
        if (!channel) return;

        const { feeds } = channel;
        lastId = channel._id;

        await feeds.reduce(async (previousPromise, feed) => {
            await previousPromise;
            await crawlArticle(feed, channel);
        }, Promise.resolve());
    }
}

const interval = 15 * 60 * 1000;

setInterval(fetchArticlesInBatches, interval);
fetchArticlesInBatches();
