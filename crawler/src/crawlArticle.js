/* eslint-disable no-underscore-dangle */
const Parser = require('rss-parser');
const getImgFromArticle = require('./getImg');
const getCategory = require('./getCategory');
const getDB = require('./db');

const parser = new Parser({
    customFields: {
        item: 'media:thumbnail',
    },
});

// returns id with domain + articleID
function getIdFromArticle(feed, guid) {
    const url = new URL(feed.link);
    const { hostname } = url;
    const domain = hostname.split('.').slice(-2).join('.');
    return `${domain}-${guid}`;
}

async function crawlArticle(feedObject, channel) {
    try {
        const feed = await parser.parseURL(feedObject.url);

        const db = await getDB();
        const collection = db.collection('article');

        await feed.items.reduce(async (previousPromise, orginalArticle) => {
            await previousPromise;

            const guid = getIdFromArticle(feed, orginalArticle.guid);

            const existingReport = await collection.findOne({ _id: guid });
            if (existingReport) return;

            const subject = await getCategory({
                title: orginalArticle.title,
                link: orginalArticle.link,
                description: orginalArticle.contentSnippet,
            });

            const article = {
                _id: guid,
                title: orginalArticle.title,
                link: orginalArticle.link,
                description: orginalArticle.contentSnippet,
                img: getImgFromArticle(orginalArticle),
                isoDate: orginalArticle.isoDate,
                language: feedObject.language,
                subject,
                channelFK: channel._id,
            };

            await collection.updateOne(
                { _id: article._id },
                { $set: article },
                { upsert: true },
            );
        }, Promise.resolve());
    } catch (error) {
        console.error(error); // replace with logger
    }
}

module.exports = crawlArticle;
