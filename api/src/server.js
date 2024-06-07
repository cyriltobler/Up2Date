const express = require('express');
const getArticles = require('./getArticles');

const app = express();
const port = 3000;

app.get('/api/articles', async (req, res) => {
    try {
        const articles = await getArticles();

        res.json(articles);
    } catch (error) {
        console.log(error);
        res.status(500).send('Beim berechnen ist ein Fehler aufgetreten.');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
