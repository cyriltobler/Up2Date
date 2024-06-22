const checkIfAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not autheticated' });
    }
    return next();
};

module.exports = { checkIfAuthenticated };
