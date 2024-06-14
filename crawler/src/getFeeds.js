const cheerio = require('cheerio');
const axios = require('axios');
const getDB = require('./db');

function getIcon($, websiteUrl) {
    let channelImg = $('link[rel="icon"]').attr('href')
    || $('link[rel="shortcut icon"]').attr('href')
    || $('link[rel="apple-touch-icon"]').attr('href')
    || '/favicon.ico';

    if (!channelImg.startsWith('http')) {
        const url = new URL(websiteUrl);
        channelImg = url.origin + (channelImg.startsWith('/') ? '' : '/') + channelImg;
    }

    return (channelImg);
}

async function getInsertObject(url) {
    try {
        const siteResponse = await axios.get(url);
        const html = siteResponse.data;
        const $ = cheerio.load(html);
        const aTags = $('a');

        const insertObject = [];

        const channelImg = getIcon($, url);

        const fetchPromise = aTags.map(async (index, element) => {
            let link = $(element).attr('href');
            const title = $(element).text();

            if (!link) {
                return;
            }
            if (link.startsWith('/')) {
                const previousURL = new URL(url);
                link = new URL(link, previousURL.origin).href;
            }
            if (!link.startsWith('http') || link.includes('account')) {
                return;
            }

            try {
                const response = await axios.get(link);
                const contentType = response.headers['content-type'];
                if (!contentType) return;

                const fileType = contentType.split(';')[0];
                if (fileType === 'text/xml' || fileType === 'application/xml') {
                    insertObject.push({ title, url: link });
                }
            } catch (error) {
                console.error('invalid link');
                // console.error(error, link);
            }
        });
        await Promise.all(fetchPromise);
        return { feeds: insertObject, channelImg };
    } catch (error) {
        return console.error(error);
    }
}

async function startCrawlFeeds(url) {
    const { feeds, channelImg } = await getInsertObject(url);

    const db = await getDB();
    const collection = db.collection('channel');

    const urlObject = new URL(url);
    const domain = urlObject.hostname.replace(/^www\./, '');

    const channel = {
        domain,
        channelImg,
        feeds,
    };

    await collection.updateOne(
        { domain: channel.domain },
        { $set: channel },
        { upsert: true },
    );

    console.log('Finished: ', url);
}

const urls = [
    'https://www.wired.com/about/rss-feeds/',
    'https://www.srf.ch/really-simple-syndication-rss-feeds-von-srf?srg_shorturl_source=rss',
    'https://www.bbc.co.uk/news/10628494',
];

startCrawlFeeds(urls[urls.length - 3]);
