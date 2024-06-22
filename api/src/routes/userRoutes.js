const express = require('express');
const userController = require('../controllers/userCotroller');

const router = express.Router();

router.put('/language', userController.handleSetLanguage);

module.exports = router;
