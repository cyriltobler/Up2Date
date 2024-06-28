const articleController = require('./controller/articleController');

function startCrawler() {
    articleController.handleStartFetchingArticles();
}

const interval = 15 * 60 * 1000;

setInterval(startCrawler, interval);
startCrawler();
