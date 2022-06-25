import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine','ejs')

app.get('/normalizecss',(req,res)=>{
    res.sendFile('./node_modules/normalize.css/normalize.css', { root: __dirname })
})

app.get('/milligramcss',(req,res)=>{
    res.sendFile('./node_modules/milligram/dist/milligram.css', { root: __dirname })
})

app.get('/selfcss',(req,res)=>{
    res.sendFile('./styles/style.css', { root: __dirname })
})

app.get('/404err',(req,res)=>{
    res.sendFile('./assets/404err.png', { root: __dirname })
})

app.get('/',(req,res)=>{
    // res.sendFile('/views/home.html', { root: __dirname })
    res.render('home',{ title: 'Home' })
})

app.get('/create',(req,res)=>{
    res.render('create',{ title: 'Create' })
})

app.get('/about',(req,res)=>{
    // res.sendFile('/views/about.html', { root: __dirname })
    res.render('about',{ title: 'About' })
})

app.get('/contact',(req,res)=>{
    res.render('contact',{ title: 'Contact' })
})

app.get('/aboutme',(req,res)=>{
    res.redirect('/about')
})

app.get('*',(req,res)=>{
    res.render('404',{ title: '404 Error' })
})

// app.use((req,res) => {
//     res.json({
//         msg: '404 again'
//     })
// })

app.listen(5000,()=>{
    console.log("Server running on 5000")
})