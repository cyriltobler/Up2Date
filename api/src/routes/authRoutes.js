const express = require('express');
const passport = require('../config/passportConfig');
const auth = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apple/callback', passport.authenticate('authtoken'), auth.handleSendUser);
router.get('/', authMiddleware.checkIfAuthenticated, auth.handleSendUser);
router.delete('/logout', auth.handleLogOutUser);

module.exports = router;
