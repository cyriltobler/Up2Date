/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const getDB = require('../db');

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    const db = await getDB();
    const collection = db.collection('user');

    const response = await collection.findOne({ _id: id });
    return done(null, response);
});

// load all strategy
const appleStrategy = require('./appleStrategy');

passport.use(appleStrategy);

module.exports = passport;
