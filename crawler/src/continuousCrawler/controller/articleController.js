/* eslint-disable no-underscore-dangle */
const channelService = require('../service/channelService');
const feedService = require('../service/feedService');
const articleService = require('../service/articleService');

async function handleStartFetchingArticles(lastId = null) {
    const channel = await channelService.getNextChannel(lastId);
    if (!channel) return;

    const { feeds } = channel;

    // Loop through all Feeds from one channel
    await feeds.reduce(async (previousPromise, feedObject) => {
        await previousPromise;
        console.log('Start fetching ', feedObject.url);

        const feed = await feedService.fetchFeed(feedObject);

        // Loop through all Articles from one feed
        await feed.items.reduce(async (previousPromise2, article) => {
            await previousPromise2;

            try {
                const articleId = articleService.getIdFromArticle(article.guid, feedObject);
                console.log(articleId);
                const existingReport = await articleService.getArticleById(articleId);
                if (existingReport) return;

                await articleService.createArticleObject(article, feedObject, channel, articleId);
            } catch (e) {
                console.error(e);
            }
        }, Promise.resolve());

        console.log('Finished fetching ', feedObject.url);
    }, Promise.resolve());

    lastId = channel._id;
    handleStartFetchingArticles(lastId);
}

module.exports = { handleStartFetchingArticles };
