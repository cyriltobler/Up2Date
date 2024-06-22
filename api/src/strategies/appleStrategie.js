const AuthTokenStrategy = require('passport-auth-token');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const userService = require('../service/userService');

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

        const user = await userService.getUserByID(decoded.sub);

        if (!user) {
            const newUser = await userService.createUser(decoded);
            return done(null, newUser);
        }

        return done(null, user);
    } catch (error) {
        return done(null, false, { error: error.message });
    }
});

module.exports = appleStartegy;
