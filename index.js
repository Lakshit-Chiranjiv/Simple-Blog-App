import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import { MONGO_DB_URI } from './dbConfig.js';
import mongoose from "mongoose";
import BlogModel from "./models/blogModel.js";

const app = express();

mongoose.connect(MONGO_DB_URI)
    .then(result => {
        console.log("Connected to DB")
        app.listen(5000,()=>{
            console.log("Server running on 5000")
        })
    })
    .catch(err => console.log(err))

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(morgan('dev'))

app.use(express.static('public'))

app.get('/normalizecss',(req,res)=>{
    res.sendFile('./node_modules/normalize.css/normalize.css', { root: __dirname })
})

app.get('/milligramcss',(req,res)=>{
    res.sendFile('./node_modules/milligram/dist/milligram.css', { root: __dirname })
})

// app.get('/selfcss',(req,res)=>{
//     res.sendFile('./styles/style.css', { root: __dirname })
// })

// app.get('/404err',(req,res)=>{
//     res.sendFile('./assets/404err.png', { root: __dirname })
// })

// app.get('/add',(req,res) => {
//     const blog = new BlogModel(
//         {
//             blogTitle: 'Milligram CSS Tutorials',
//             blogBody: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis quia ducimus, error quo ullam rerum optio minima repellendus reprehenderit. At sint amet eaque ipsum veniam. Dignissimos, necessitatibus nobis excepturi porro corrupti, inventore suscipit ipsa quia doloribus aliquam, alias quam veniam!',
//             readBy: 122,
//             tags: ['CSS','Framework']
//         }
//     )

//     blog.save()
//         .then(result => res.json(result))
//         .catch(err => res.json({ msg: 'Some error occured' }))
// })

app.get('/',(req,res)=>{
    BlogModel.find().sort({ createdAt: -1 })
        .then(blogs => res.render('home',{ title: 'Home' , blogs}))
        .catch(err => console.log(err))
    // res.sendFile('/views/home.html', { root: __dirname })
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

app.post('/addblog',(req,res) => {
    const blog = new BlogModel(req.body)
    blog.save()
        .then((result)=>{
            console.log(result)
            res.redirect('/')
        })
        .catch((err)=>{
            console.log("Some error",err);
        })
})

app.get('*',(req,res)=>{
    res.render('404',{ title: '404 Error' })
})





// app.use((req,res) => {
//     res.json({
//         msg: '404 again'
//     })
// })

// app.listen(5000,()=>{
//     console.log("Server running on 5000")
// })