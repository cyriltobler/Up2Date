const express = require('express');
const session = require('express-session');
const passport = require('./auth/passportConfig');
const bodyParser = require('body-parser');
const { checkIfAuthenticated } = require('./auth/middleware');

const app = express();
const port = 3000;

// Load middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const sessionMiddleware = session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// import other routes
const authRoutes = require('./auth/authRoutes');
const profileRoutes = require('./profie/profileRoutes');
const articlesRoutes = require('./article/articles');

app.use('/auth', authRoutes);
app.use('/api/profile', checkIfAuthenticated, profileRoutes);
app.use('/api/articles', checkIfAuthenticated, articlesRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
