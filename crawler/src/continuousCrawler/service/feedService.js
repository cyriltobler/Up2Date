const Parser = require('rss-parser');

// TODO: Maybe in config
const parser = new Parser({
    customFields: {
        item: 'media:thumbnail',
    },
});

async function fetchFeed(feedObject) {
    const feed = await parser.parseURL(feedObject.url);

    return feed;
}

module.exports = { fetchFeed };
