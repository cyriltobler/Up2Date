const userService = require('../service/userService');

async function handleSetLanguage(req, res) {
    const { _id } = req.user;
    const { language } = req.body;

    try {
        await userService.modifyLanguage(_id, language);

        res.status(201).json();
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { handleSetLanguage };
