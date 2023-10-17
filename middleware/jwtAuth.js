const jwt = require("jsonwebtoken");

const jwtAuth = (req,res,next)=>{
    let jwtToken;

    const authHeader = req.headers["authorization"] 

    if(authHeader !== undefined){
        jwtToken=authHeader.split(" ")[1] //token
    }
    
   
    if(authHeader === undefined){
        return res.status(401).json({message:"Invalid JWT Token"})
    }else{
        jwt.verify(jwtToken, 'JOBBY_SCERET', async(error, payload)=>{
            if(error){
                return  res.status(401).json({mesage:"Invalid JWT Token"})
            }else{
                req.id = payload.id 
                next();
            }
        })
    }
}

module.exports = jwtAuth;