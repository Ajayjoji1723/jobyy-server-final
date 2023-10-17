const express = require("express");
const bcrypt = require("bcrypt");
const JobbyUserData = require('../models/jobbyUsers');
const jwtAuth = require('../middleware/jwtAuth');
const jwt = require("jsonwebtoken");
const router = express.Router(); 


router.get("/", (req,res)=>{
    res.send("this authentication router")
})


//register api 
router.post("/signup", async(req,res)=>{
    try{
            const {name,email,phoneNumber,gender,password} = req.body;
            const isExist = await JobbyUserData.findOne({email: email}); 

        if(!isExist){
            const hashedPassword = await bcrypt.hash(password, 10) //it will genretae a encrypted password

            const user = new JobbyUserData({
                name:req.body.name,
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
                gender:req.body.gender,
                password:hashedPassword

            });
            user.save();
            return res.status(200).json({message:"Registartion Success"})
        }else{
            return res.status(400).json({message:"User Already Registred"})
        }
    }catch(e){
        console.log(e.message)
        return res.status(500).json({message:"Internal Server"})
    }

})

//login api

router.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body
        const isExist = await JobbyUserData.findOne({email: email});

        if(isExist){
            const isPasswordMatched = await bcrypt.compare(password, isExist.password) //true or false
            if(isPasswordMatched){
                //generate token 
                let payload = {
                    id: isExist._id
                }
                //create a token 
                let token = jwt.sign(payload, 'JOBBY_SCERET', {expiresIn: '1hr'});

             

                return res.status(200).json({token:token, message:"Login Success"})
            }else{
                return res.status(400).json({message:"Password Not Matched"})
            }
        }else{
            return res.status(400).json({message:"User Not Found"})
        }

    }catch(e){
        console.log(e.message);
        return res.status(500).json({message:"Internal Server Error"})
    }

    
})


//profile API 
router.get("/profile", jwtAuth,async(req,res)=>{
    const user = await JobbyUserData.findOne({_id: req.id})
    res.send(user);
})

module.exports = router;