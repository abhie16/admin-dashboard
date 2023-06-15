const express = require('express');
const path = require('path');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const bodyParser = require('body-parser');

const router = require('./router.js');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static',express.static(path.join(__dirname,'public')));

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'));
})
app.use(router);

module.exports = app;