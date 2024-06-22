const articleService = require('../service/articleService');

async function handleSendRecommendedArticles(req, res) {
    const { language, seenArticleIds, _id } = req.user;

    try {
        const articles = await articleService.getRecommendedArticles(seenArticleIds, language);
        await articleService.setSeenArticles(articles, _id);
        res.json(articles);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function handleSendArticlesBySubject(req, res) {
    const { subject } = req.params;
    const { language, seenArticleIds, _id } = req.user;

    try {
        const articles = await articleService.getArticlesBySubject(
            seenArticleIds,
            language,
            subject,
        );

        await articleService.setSeenArticles(articles, _id);
        res.json(articles);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { handleSendRecommendedArticles, handleSendArticlesBySubject };
