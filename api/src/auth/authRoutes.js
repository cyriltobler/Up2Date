const express = require('express');
const passport = require('./passportConfig');

const router = express.Router();

router.post('/apple/callback', passport.authenticate('authtoken'), (req, res) => {
    res.status(200).json();
});

router.get('/', (req, res) => {
    const isAuthenticated = Boolean(req.user);
    res.json({ isAuthenticated });
});

router.delete('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { res.status(500).send(); }
    });
    res.status(204).send();
});

module.exports = router;
