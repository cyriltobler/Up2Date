/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const userService = require('../service/userService');

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    const user = await userService.getUserByID(id);

    return done(null, user);
});

// load all strategy
const appleStrategy = require('../strategies/appleStrategie');

passport.use(appleStrategy);

module.exports = passport;
