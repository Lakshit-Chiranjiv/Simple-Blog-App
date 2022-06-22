import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    // res.sendFile('/views/home.html', { root: __dirname })
    res.render('home')
})

app.get('/about',(req,res)=>{
    // res.sendFile('/views/about.html', { root: __dirname })
    res.render('about')
})

app.get('/aboutme',(req,res)=>{
    res.redirect('/about')
})

app.get('*',(req,res)=>{
    res.json({
        msg: '404'
    })
})

app.use((req,res) => {
    res.json({
        msg: '404 again'
    })
})

app.listen(5000,()=>{
    console.log("Server running on 5000")
})