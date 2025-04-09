const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('authtoken');//using postman add token in the header section with key= authtoken

    if (!token) {
        return res.status(401).json({ msg: 'authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;