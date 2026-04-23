const jwt = require('jsonwebtoken');
const JWT_SECRET = "sshhhhhh";


function authMiddleware (req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).josn({
            message: "Unauthorized or invalid token"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or expireed token"
        });
    }
}

module.exports = authMiddleware