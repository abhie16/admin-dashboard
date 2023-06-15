var express = require('express');
var router = express.Router();
var path = require('path');

const credential = {
    email:"admin@gmail.com",
    password:"admin123"
}

router.post('/login', (req,res) =>{
    if(req.body.email === credential.email && req.body.password === credential.password ){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end('successfull');
    }
    else{
        res.end("Invalid Username")
    }
})

router.get('/dashboard',(req,res) =>{
    if(req.session.user){
        res.sendFile(path.join(__dirname,'public','dashboard.html'));
    }
    else{
        res.send("Unauthorized User");
    }
})

router.get('/logout',(req,res) =>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("error");
        }
        else{
            res.sendFile(path.join(__dirname,'public','login.html'));
        }
    })
})

module.exports = router;