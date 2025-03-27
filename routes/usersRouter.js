const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllPreferences, updatePreferences } = require("../controllers/usersController");
const { isAuthorized } = require("../middlewares/authorization");

router.post("/signup", async (req, res) => {
    try {
        const user = req.body;
        const dbUser = await registerUser(user);
        res.status(201).send(dbUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(200).send({ message: "Email already exists. Please use a different email." }); // Reverted to 200 OK
        } else if (error.message === "Mandatory Fields are missing") {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const { token } = await loginUser(body); // Destructure token
        res.status(200).send({ token }); // Send token in response
    } catch (error) {
        if (error.message === "InCorrect Password") {
            return res.status(401).send({ message: error.message });
        }
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/preferences", [isAuthorized], async (req, res) => {
    try {
        const user = req.user;
        const preferences = await getAllPreferences(user.userId);
        res.status(200).send({ preferences }); // Wrap preferences in an object
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/preferences", [isAuthorized], async (req, res) => {
    try {
        const user = req.user; // Ensure req.user is used
        const updatedPreferences = await updatePreferences(user.userId, req.body.preferences);
        res.status(200).send({ preferences: updatedPreferences.preferences }); // Wrap updated preferences in an object
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;