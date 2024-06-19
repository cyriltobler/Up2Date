function getIcon($, websiteUrl) {
    let channelImg = $('link[rel="icon"]').attr('href')
    || $('link[rel="shortcut icon"]').attr('href')
    || $('link[rel="apple-touch-icon"]').attr('href')
    || '/favicon.ico';

    if (!channelImg.startsWith('http')) {
        const url = new URL(websiteUrl);
        channelImg = url.origin + (channelImg.startsWith('/') ? '' : '/') + channelImg;
    }

    return (channelImg);
}

module.exports = getIcon;
