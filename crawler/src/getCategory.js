function multiplyObject(obj, multiplier) {
    const newObj = {};

    Object.keys(obj).forEach((key) => {
        newObj[key] = obj[key] * multiplier;
    });

    return newObj;
}

function getSumOfObjects(objects) {
    const result = {};

    objects.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
            if (!result[key]) {
                result[key] = 0;
            }
            result[key] += obj[key];
        });
    });

    return result;
}

function getHighestValue(obj) {
    let maxValue = 0;
    let maxKey = null;

    Object.keys(obj).forEach((key) => {
        if (obj[key] > maxValue) {
            maxKey = key;
            maxValue = obj[key];
        }
    });

    return maxKey;
}

async function fetchCategorizeApi(text, multiplier) {
    const response = await fetch('http://localhost:8000/api/classify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description: text,
        }),
    });

    if (!response.ok) throw new Error(`Failed to fetch data: ${JSON.stringify(response)}`);
    const data = await response.json();

    return multiplyObject(data, multiplier);
}

async function getCategory(article) {
    const { title, description, link } = article;

    const path = new URL(link).pathname;
    const segments = path.split('/').slice(1, -1);
    const keywordsFromLink = segments.join(' ');

    const categoryValueObjectsPromise = [
        fetchCategorizeApi(title, 1),
        fetchCategorizeApi(description, 1),
        fetchCategorizeApi(keywordsFromLink, 1),
    ];
    const categoryValueObjects = await Promise.all(categoryValueObjectsPromise);
    const categoryValue = getSumOfObjects(categoryValueObjects);

    return getHighestValue(categoryValue);
}

module.exports = getCategory;
