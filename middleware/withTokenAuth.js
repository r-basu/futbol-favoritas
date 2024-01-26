const jwt = require("jsonwebtoken")
const withTokenAuth = (req,res,next)=>{
    const token  = req.headers?.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({msg:"invalid token"})
    }
    try {
        const tokenData = jwt.verify(token,process.env.JWT_SECRET)
        req.tokenData=tokenData;
        next()
    } catch (error) {
        return res.status(403).json({msg:"invalid token"})
    }
}

module.exports = withTokenAuth;