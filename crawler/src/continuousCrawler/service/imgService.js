function getURL(article) {
    if (article.enclosure) {
        return article.enclosure.url;
    }

    if (article['media:thumbnail']) {
        return article['media:thumbnail'].$.url;
    }

    if (article['media:content']) {
        return article['media:content'].$.url;
    }

    const regex = /<img.*?src="(.*?)".*?>/;
    const match = regex.exec(article.content);
    if (match) {
        return match[1];
    }

    return null;
}

function prepareURL(url) {
    const urlObj = new URL(url);
    const sParam = urlObj.searchParams.get('s');
    urlObj.search = '';

    if (sParam) {
        urlObj.searchParams.set('s', sParam);
    }

    return urlObj.toString();
}

function getImgFromArticle(article) {
    const url = getURL(article);

    if (!url) {
        // TOCO: Write Error
        console.log('No img found', article.link);
        return null;
    }

    return prepareURL(url);
}

module.exports = { getImgFromArticle };
