const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const isAuthorized = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
    console.log(token);
    if (!token) {
        return res.status(401).send({ message: "Token is required" });
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (e) {
        return res.status(401).send({ message: "Invalid Token" });
    }
};

module.exports = { isAuthorized };