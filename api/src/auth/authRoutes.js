const express = require('express');
const passport = require('./passportConfig');

const router = express.Router();

router.post('/apple/callback', passport.authenticate('authtoken'), (req, res) => {
    const { email, language } = req.user;
    const user = {
        email,
        language,
    };

    res.status(200).json({ user });
});

router.get('/', (req, res) => {
    if (!req.user) return res.status(200).json({ isAuthenticated: false });
    const { email, language } = req.user;
    const user = {
        email,
        language,
    };
    return res.status(200).json({ isAuthenticated: true, user });
});

router.delete('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { res.status(500).send(); }
    });
    res.status(204).send();
});

module.exports = router;
