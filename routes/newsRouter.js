const express = require("express");
const axios = require("axios");
const { isAuthorized } = require("../middlewares/authorization");
const usersModel = require("../models/usersModel");
const router = express.Router();
const NEWS_API_URL = "https://newsapi.org/v2/everything";
const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get("/", [isAuthorized], async (req, res) => {
    const userId = req.user.userId;
    const user = await usersModel.findById(userId);
    const preferences = user.preferences;

    if (!preferences || preferences.length === 0) {
        return res.status(400).send({ message: "No preferences found" }); // Handle empty preferences
    }

    const preferencesQuery = preferences.join(" OR ");

    const news = await axios.get(NEWS_API_URL, {
        params: {
            q: preferencesQuery,
            apiKey: NEWS_API_KEY
        }
    });
    res.status(200).send({ news: news.data.articles }); // Send articles under "news"
});

module.exports = router;