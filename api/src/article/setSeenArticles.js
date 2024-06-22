/* eslint-disable no-underscore-dangle */
async function setSeenArticles(db, userId, articles) {
    const newSeenIds = articles.map((article) => article._id);

    const usersCollection = db.collection('user');
    await usersCollection.updateOne(
        { _id: userId },
        { $push: { seenArticleIds: { $each: newSeenIds } } },
    );
}

module.exports = setSeenArticles;
