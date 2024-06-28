/* eslint-disable no-undef */

// Test was generated with ChatGPT and then revised
const getDB = require('../../config/dbConfig');

test('config dbConfig', async () => {
    expect.assertions(1);

    const db = await getDB();
    expect(db).toBeDefined();
});

describe('getDB function', () => {
    it('should connect to MongoDB and return the app database', async () => {
        const db = await getDB();

        expect(db.databaseName).toBe('app');
    });
});
