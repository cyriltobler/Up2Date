/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

// Test was generated with ChatGPT and then revised
const passport = require('../../config/passportConfig');
const userService = require('../../service/userService');

jest.mock('../../service/userService', () => ({
    getUserByID: jest.fn(),
}));

jest.mock('../../strategies/appleStrategie', () => jest.fn());

describe('Passport Configuration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should serialize user by id', () => {
        const user = { _id: '123' };
        const done = jest.fn();

        passport.serializeUser(user, done);

        expect(done).toHaveBeenCalledWith(null, '123');
    });

    it('should deserialize user by id', async () => {
        const user = { _id: '123', name: 'John Doe' };
        const done = jest.fn();

        userService.getUserByID.mockResolvedValue(user);

        await passport.deserializeUser('123', done);

        expect(userService.getUserByID).toHaveBeenCalledWith('123');
        expect(done).toHaveBeenCalledWith(null, user);
    });
});
