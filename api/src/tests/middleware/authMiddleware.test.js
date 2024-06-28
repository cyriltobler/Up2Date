/* eslint-disable no-undef */

// Test was generated with ChatGPT and then revised
const { checkIfAuthenticated } = require('../../middleware/authMiddleware');

describe('checkIfAuthenticated middleware', () => {
    it('should call next() if user is authenticated', () => {
        const req = {
            isAuthenticated: () => true,
        };
        const res = {};
        const next = jest.fn();

        checkIfAuthenticated(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).toBeUndefined();
    });

    it('should return 401 if user is not authenticated', () => {
        const req = {
            isAuthenticated: () => false,
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();

        checkIfAuthenticated(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Not autheticated' });
    });
});
