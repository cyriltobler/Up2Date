const express = require('express');
const getDB = require('../db');

const router = express.Router();

router.put('/language', async (req, res) => {
    const { _id } = req.user;
    const { language } = req.body;

    const db = await getDB();
    const collection = db.collection('user');
    collection.updateOne(
        { _id },
        { $set: { language } },
    );

    res.status(201).json();
});

module.exports = router;
