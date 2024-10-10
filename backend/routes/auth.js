const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const fetchUser = require('../middleware/fetchUser');

const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET="my card details";
//signup
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Password length too small (atleast 5)').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User with given email already exists!" })
        }
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken})
        // res.json(user);

        // .then(user => res.json(user))
        // .catch(err=>console.log(err))
        // res.json({error:"Email selected is already registered!"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occurred")
    }
})
//login
router.post('/login', [
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const payload={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(payload,JWT_SECRET);
        success=true;
        res.json({success,authToken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
//getuser
router.post('/getuser',fetchUser, async (req, res) => {
    try{
        const userId=req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
    } catch(error){
        console.error(error);

    }
})
module.exports = router