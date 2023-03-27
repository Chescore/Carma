const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { Consumer } = require('../models/consumer')

router.post('/register',async(req,res)=>{
    try{
        const {username, email, password, passwordVerify, phone} = req.body;

        if(username == ""){
            return res.status(400).send("Missing field(s)")
        }
        if(email == ""){
            return res.status(400).send("Missing field(s)")
        }
        if(phone == ""){
            return res.status(400).send("Missing field(s)")
        }
        if(password == ""){
            return res.status(400).send("Missing field(s)")
        }
        if(passwordVerify == ""){
            return res.status(400).send("Missing field(s)")
        }

        const oldUsername = await Consumer.findOne({username});
        if(oldUsername){
            return res.status(400).send('Username already exists')
        }

        const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    
        if(!emailRegex.test(email)) return res.status(400).send('Invalid email address');

        const oldUser = await Consumer.findOne({email});
        if(oldUser){
            return res.status(400).send('Email already exists');
        }

        if(password!==passwordVerify){
            return res.status(400).send('Passwords dont match')
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const consumer = new Consumer({
            username: username,
            email: email,
            password:encryptedPassword,
            phone:phone
        })
        
        await consumer.save();
        const token = consumer.generateAuthToken();
        consumer.token = token;

        // Save token in a cookie
        res.cookie('token',token,{
            httpOnly:true,
            secure: true,
            sameSite: "none"
        }).send("Account created successfully")
    }catch(err){
        console.log(err);
    }
})

router.post('/login', async(req,res)=>{
    try{
        const {email, password} = req.body;

        if(email == ""){
            return res.status(400).send("Missing field(s)")
        }
        if(password == ""){
            return res.status(400).send("Missing field(s)")
        }

        const consumer = await Consumer.findOne({email: email});

        if(consumer && (await bcrypt.compareSync(password, consumer.password))){
            const token = consumer.generateAuthToken();
            consumer.token = token;
            res.cookie('token',token,{
                httpOnly:true,
                secure: true,
                sameSite: "none"
            }).send("Login was successful")
        }else{
            res.status(401).send('Invalid Email or Password');
        }
    }catch(err){
        console.log(err);
    }
})

router.get('/logout',(req,res)=>{
    res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send("Logged out successfully");
})

router.get('/loggedIn', (req,res)=>{
    try{
        const token = req.cookies.token;
        if(!token) return res.json(false);

        jwt.verify(token,process.env.CONSUMER_TOKEN_KEY);
        
        res.send(true)
    }catch(err){
        res.json(false);
    }
})

module.exports = router;