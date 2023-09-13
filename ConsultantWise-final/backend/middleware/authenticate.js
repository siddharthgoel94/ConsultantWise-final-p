const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keysecret = process.env.KEY

const authenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.doctorwise;
        
        const verifyToken = jwt.verify(token,keysecret);
     
        // const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
        db.query('SELECT * from users WHERE id=?',[verifyToken.id],(err,results)=>{
            if(!results){throw new Error("User Not Found") };
        req.token = token; 
        req.rootUser = results[0];   
        req.userID = results._id;   
            
        })
       

        

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  


    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }
};

module.exports = authenticate;