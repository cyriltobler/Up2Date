const iso639 = require('../data/iso_639.json');

function getLanguage(languageInput) {
    const code = languageInput.split('-')[0];

    const language = iso639.find((lang) => lang['639-1'] === code || lang['639-2'] === code || lang['639-2/B'] === code);
    return language ? language['639-2'] : null;
}

module.exports = getLanguage;
