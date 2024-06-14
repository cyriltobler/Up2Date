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

        const crawlPromises = feeds.map(async (feed) => {
            console.log(feed.url);
            await crawlArticle(feed.url, channel);
            console.log("fetched: ", feed.url);
        });
        await Promise.all(crawlPromises);
    }
}

const interval = 15 * 60 * 1000;

setInterval(fetchArticlesInBatches, interval);
fetchArticlesInBatches();
