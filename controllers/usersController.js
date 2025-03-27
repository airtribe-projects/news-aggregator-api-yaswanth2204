const saltRounds = 10;
const bcrypt = require("bcrypt");
const userModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (user) => {
        if (!user.email || !user.name || !user.preferences || !user.password) {
            throw new Error("Mandatory Fields are missing");
        }

        user.password = bcrypt.hashSync(user.password, saltRounds);
        const dbUser = await userModel.create(user);
        return dbUser;

};

const loginUser = async (details) => {
        const body = {
            email: details.email
        };
        const dbUser = await userModel.findOne(body);
        if (!dbUser) {
            throw new Error("User not found");
        }

        const isSamePassword = await bcrypt.compare(details.password, dbUser.password);
        if (!isSamePassword) {
            throw new Error("InCorrect Password");
        }
        const token = jwt.sign(
            { userId: dbUser._id, name: dbUser.name, email: dbUser.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        return { token }; // Return token as an object
    
};

const getAllPreferences = async (userId) => {
    if (!userId) {
        throw new Error("No user Id");
    }
    const dBuser = await userModel.findById(userId);

    if (!dBuser) {
        throw new Error("User not Found");
    }
    return dBuser.preferences;
};

const updatePreferences = async (userId, preferences) => {
    const dBuser = await userModel.findById(userId);
    if (!dBuser) {
        throw new Error("User not found");
    }
    if (preferences) {
        dBuser.preferences = preferences;
    }
    const updatedPreferences = await dBuser.save();
    return { preferences: updatedPreferences.preferences }; // Return preferences as an object
};

module.exports = { registerUser, loginUser, getAllPreferences, updatePreferences };