require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const jwksClient = jwks({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    audience: process.env.AUTH0_AUDIENCE,
});
const { promisify } = require('util'); // this comes from node OOB

const getAccessTokenFromHeaders = (headers) => {
    const rawAuthorization = headers.authorization;
    if (!rawAuthorization) {
        return null;
    }
    // split our auth from "Bearer"
    const authorizationParts = rawAuthorization.split(' ');
    if (authorizationParts[0] !== 'Bearer' || authorizationParts.length !== 2) {
        return null;
    }
    return authorizationParts[1];
};

const validateAccessToken = async (token) => {
    try {
        const decodedToken = jwt.decode(token, { complete: true }); // complete to true will parse both body (user info) and header (e.g. kid) of JWT
        const kid = decodedToken.header.kid;
        const alg = decodedToken.header.alg;
        const getSigninKey = promisify(jwksClient.getSigningKey);
        const key = await getSigninKey(kid);
        const signingKey = key.publicKey;
        const options = {
            algorithms: alg,
        };
        jwt.verify(token, signingKey, options);
        return decodedToken.payload;
    } catch (e) {
        console.log(e);
        return null;
    }
};

module.exports = {
    getAccessTokenFromHeaders,
    validateAccessToken,
};
