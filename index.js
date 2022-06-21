import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/',(req,res)=>{
    res.sendFile('/views/home.html', { root: __dirname })
})

app.get('/about',(req,res)=>{
    res.sendFile('/views/about.html', { root: __dirname })
})

app.get('/aboutme',(req,res)=>{
    res.redirect('/about')
})

app.listen(5000,()=>{
    console.log("Server running on 5000")
})