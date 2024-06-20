const express = require('express');
const session = require('express-session');
const getArticles = require('./getArticles');
const passport = require('./auth/passportConfig');
const bodyParser = require('body-parser');

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

app.use('/auth', authRoutes);

app.get('/api/articles', async (req, res) => {
    // console.log(req.user);
    try {
        const articles = await getArticles(req);

        res.json(articles);
    } catch (error) {
        console.log(error);
        res.status(500).send('Beim berechnen ist ein Fehler aufgetreten.');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
