const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req,res,next) => {
    try {
        const token  = req.cookies.token;
        if(!token) return res.status(401).json({errorMessage : 'Unauthorized'});
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token})
        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        return res.status(401).json({errorMessage : 'Unauthorized'})
    }

}

module.exports = auth