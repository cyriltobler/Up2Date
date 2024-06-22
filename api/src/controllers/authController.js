const userService = require('../service/userService');

async function handleSendUser(req, res) {
    try {
        const user = await userService.getUserInfo(req);

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

function handleLogOutUser(req, res) {
    try {
        req.logout((err) => {
            if (err) res.status(500).send();
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { handleSendUser, handleLogOutUser };
