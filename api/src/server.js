const express = require('express');
const bodyParser = require('body-parser');
const { checkIfAuthenticated } = require('./middleware/authMiddleware');
const sessionMiddleware = require('./config/sessionConfig');
const passport = require('./config/passportConfig');

const app = express();
const port = 3000;

// Load middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// import other routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

app.use('/auth', authRoutes);
app.use('/api/profile', checkIfAuthenticated, profileRoutes);
app.use('/api/articles', checkIfAuthenticated, articleRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
