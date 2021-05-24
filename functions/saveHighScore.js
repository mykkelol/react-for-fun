const { table, getHighScores } = require('./utils/airtable');
const {
    getAccessTokenFromHeaders,
    validateAccessToken,
} = require('./utils/auth');

exports.handler = async (event) => {
    const token = getAccessTokenFromHeaders(event.headers);
    const user = await validateAccessToken(token);
    // if bad JWT token (or lack thereof) from auth0
    if (!user) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                err: 'User is not logged in or unauthorized.',
            }),
        };
    }

    if (event.httpMethod != 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({
                err: 'Method is not allowed.',
            }),
        };
    }

    const { score } = JSON.parse(event.body);
    const name = user['https://learnbuildtype/username'];
    if (!name || typeof score === 'undefined') {
        return {
            statusCode: 400,
            body: JSON.stringify({
                err: 'Bad request',
            }),
        };
    }

    try {
        const records = await getHighScores(false);
        const lowestRecord = records[9];
        if (
            typeof lowestRecord.fields.score === 'undefined' ||
            score > lowestRecord.fields.score
        ) {
            const updatedRecord = {
                id: lowestRecord.id,
                fields: { name, score },
            };
            // await to wait for response before proceeding - otherwise it'd do the catch
            await table.update([updatedRecord]);
            return {
                statusCode: 200,
                body: JSON.stringify(updatedRecord),
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({}),
            };
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                err: `Failed to save score in Airtable: ${e}`,
            }),
        };
    }
};
