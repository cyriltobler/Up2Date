// check if user is logged in
const checkIfAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json();
    }
    return next();
};

module.exports.checkIfAuthenticated = checkIfAuthenticated;
