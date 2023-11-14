const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4}=require('uuid')
const nocache = require('nocache');

const router=require('./router')

const app=express()


const port=process.env.PORT||8080;

app.use(nocache())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//need to initializ e the engine (base.ejs) before use it
app.set('view engine','ejs')

//Load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:'false',
    saveUninitialized:true
}))

app.use('/route',router)
//Home route

app.get("/",(req,res)=>{
   // console.log(req.session.loged);
    if(req.session.loged){
        res.redirect('/route/dashboard')
    }else{
        res.render('base',{title:"Login System"})
    }
   
})


app.listen(port,()=>{
    console.log("Listening to the server on http://localhost:8080");
 })

