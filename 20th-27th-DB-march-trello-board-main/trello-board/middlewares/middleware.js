const jwt = require('jsonwebtoken');
const JWT_SECRET = "shhhhhh";

function authMiddleware (req, res, next){
    const token = req.cookies.token;

    if(!token){
    res.status(404).json({message: "authorization token required"})
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) { 
         return res.status(403).json({ message: "invalid or expired token" });
    }
}

module.exports = authMiddleware;