const AuthTokenStrategy = require('passport-auth-token');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const getDB = require('../db');

async function createUser(user, collection, done) {
    const { sub, email } = user;

    const newUser = {
        _id: sub,
        email,
    };

    await collection.insertOne(newUser);
    return done(null, newUser);
}

const appleStartegy = new AuthTokenStrategy(async (token, done) => {
    try {
        // Verify the id_token
        const response = await fetch('https://appleid.apple.com/auth/keys');
        const { keys } = await response.json();

        const decodedToken = jwt.decode(token, { complete: true });
        const { kid } = decodedToken.header;

        const key = keys.find((k) => k.kid === kid);
        const publicKey = jwkToPem(key);
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

        if (decoded.aud !== 'host.exp.Exponent' || decoded.iss !== 'https://appleid.apple.com') {
            return done(null, false, { error: 'Wrong aud or iss' });
        }

        const db = await getDB();
        const collection = db.collection('user');
        const dbResponse = await collection.findOne({ _id: decoded.sub });

        if (!dbResponse) return createUser(decoded, collection, done);

        return done(null, dbResponse);
    } catch (error) {
        return done(null, false, { error: error.message });
    }
});

module.exports = appleStartegy;
