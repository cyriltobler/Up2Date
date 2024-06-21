const express = require('express');
const getArticles = require('./getArticles');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const articles = await getArticles(req);
        console.log(articles);

        res.json(articles);
    } catch (error) {
        res.status(500).send('Beim berechnen ist ein Fehler aufgetreten.');
    }
});

module.exports = router;
