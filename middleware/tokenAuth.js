const jwt = require("jsonwebtoken")
const tokenAuth = function(req,res,next){
    if(req.headers.authorization){
        console.log(req.headers);
        const token =req.headers.authorization.split(" ").pop();
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET,function(err,data){
            if(err){
                console.log(err)
                return res.status(403).send("invalid token")
            } else {
                console.log("success");
                req.user = data;
                next()
            }
        })
    } else {
        return res.status(403).send("include your token")
    }
}

module.exports = tokenAuth