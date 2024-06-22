const express = require('express');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.get('/', articleController.handleSendRecommendedArticles);
router.get('/:subject', articleController.handleSendArticlesBySubject);

module.exports = router;
