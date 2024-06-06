function getImgFromArticle(article) {
    function handleDiffrentSources() {
        if (article.enclosure) {
            return article.enclosure.url;
        }

        if (article['media:thumbnail']) {
            return article['media:thumbnail'].$.url;
        }

        const regex = /<img.*?src="(.*?)".*?>/;
        const match = regex.exec(article.content);
        if (match) {
            return match[1];
        }

        return null;
    }

    function filterParams(url) {
        const urlObj = new URL(url);
        const sParam = urlObj.searchParams.get('s');
        urlObj.search = '';

        if (sParam) {
            urlObj.searchParams.set('s', sParam);
        }

        return urlObj.toString();
    }

    const url = handleDiffrentSources();
    if (!url) {
        console.log('No img found'); // write to log
        return null;
    }

    return filterParams(url);
}

module.exports = getImgFromArticle;
