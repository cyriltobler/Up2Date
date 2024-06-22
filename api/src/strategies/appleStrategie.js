const AuthTokenStrategy = require('passport-auth-token');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const userService = require('../service/userService');

async function getAppleKeys() {
    const response = await fetch('https://appleid.apple.com/auth/keys');
    const { keys } = await response.json();
    return keys;
}

async function findOrCreateUser(decoded) {
    let user = await userService.getUserByID(decoded.sub);

    if (!user) {
        user = await userService.createUser(decoded);
    }
    return user;
}

async function getPublicKey(decodedToken, jwkPublicKeys) {
    const { kid } = decodedToken.header;
    const key = jwkPublicKeys.find((k) => k.kid === kid);
    const publicKey = jwkToPem(key);
    return publicKey;
}

function isValidToken(decoded) {
    return decoded.aud === 'host.exp.Exponent' && decoded.iss === 'https://appleid.apple.com';
}

const appleStartegy = new AuthTokenStrategy(async (token, done) => {
    try {
        const jwkPublicKeys = await getAppleKeys();

        // decode token
        const decodedToken = jwt.decode(token, { complete: true });
        const publicKey = await getPublicKey(decodedToken, jwkPublicKeys);

        // verify token from user
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

        // check aud and iss
        if (!isValidToken(decoded)) {
            return done(null, false, { error: 'Wrong aud or iss' });
        }

        const user = await findOrCreateUser(decoded);

        return done(null, user);
    } catch (error) {
        return done(null, false, { error: error.message });
    }
});

module.exports = appleStartegy;
