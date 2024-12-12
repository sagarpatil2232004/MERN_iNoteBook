var jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    const authToken = req.header("auth-token");

    if (!authToken) {
        return res.status(401).json({ error: "Access Denied: No Token Provided" });
    }

    try {
        const JwtSecretKey = 'Sagar#Topper#VITPune';
        const data = jwt.verify(authToken, JwtSecretKey);
        req.user = data.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ error: "Invalid Token" });
    }
};



module.exports = fetchuser;