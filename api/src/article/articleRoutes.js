const express = require('express');
const getRecommendedArticles = require('./getRecommendedArticles');
const getArticlesFromSubject = require('./getArticlesFromSubject');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const articles = await getRecommendedArticles(req);
        res.json(articles);
    } catch (error) {
        console.log(error);
        res.status(500).send('Beim berechnen ist ein Fehler aufgetreten.');
    }
});

router.get('/:subject', async (req, res) => {
    const { subject } = req.params;
    try {
        const articles = await getArticlesFromSubject(req, subject);
        res.json(articles);
    } catch (error) {
        res.status(500).send('Beim berechnen ist ein Fehler aufgetreten.');
    }
});

module.exports = router;
