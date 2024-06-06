const Parser = require('rss-parser');
const getImgFromArticle = require('./getImg');
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

async function crawlFeed(feedURL) {
    try {
        const feed = await parser.parseURL(feedURL);

        const db = await getDB();
        const collection = db.collection('article');

        const articlesToInsert = [];

        await Promise.all(feed.items.map(async (orginalArticle) => {
            const guid = getIdFromArticle(feed, orginalArticle.guid);

            const existingReport = await collection.findOne({ _id: guid });
            if (existingReport) return;

            const article = {
                _id: guid,
                title: orginalArticle.title,
                link: orginalArticle.link,
                description: orginalArticle.contentSnippet,
                img: getImgFromArticle(orginalArticle),
                isoDate: orginalArticle.isoDate,
            };

            articlesToInsert.push(article);
        }));

        if (articlesToInsert.length === 0) return;
        await collection.insertMany(articlesToInsert);
    } catch (error) {
        console.error(error); // replace with logger
    }
}

const feeds = [
    'https://partner-feeds.beta.20min.ch/rss/20minuten',
    'https://www.srf.ch/news/bnf/rss/19032223',
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://www.nzz.ch/feuilleton.rss',
];
crawlFeed(feeds[3]);
