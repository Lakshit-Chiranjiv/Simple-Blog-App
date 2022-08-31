import express from 'express'
import BlogModel from "./../models/blogModel.js";

const Router = express.Router()


Router.get('/',(req,res)=>{
    try {
        BlogModel.find().sort({ createdAt: -1 })
        .then(blogs => res.render('home',{ title: 'Home' , blogs}))
        .catch(err => console.log(err))
    } catch (error) {
        console.log("Some error :",error)
    }
    // res.sendFile('/views/home.html', { root: __dirname })
})

Router.get('/create',(req,res)=>{
    res.render('create',{ title: 'Create' })
})

Router.get('/about',(req,res)=>{
    // res.sendFile('/views/about.html', { root: __dirname })
    res.render('about',{ title: 'About' })
})

Router.get('/contact',(req,res)=>{
    res.render('contact',{ title: 'Contact' })
})

Router.get('/aboutme',(req,res)=>{
    res.redirect('/about')
})

Router.post('/addblog',(req,res) => {
    const blog = new BlogModel(req.body)
    blog.save()
        .then((result)=>{
            console.log(result)
            res.json({redirectUrl: '/'})
        })
        .catch((err)=>{
            console.log("Some error",err);
        })
})

Router.get('/blogs/:id',async(req,res) => {
    const { id } = req.params;

    try {
        const blog = await BlogModel.findById(id)
        const updateResult = await BlogModel.findByIdAndUpdate(id,{ $inc: { readBy: 1 } })
        res.render('details', { blog, title: blog.blogTitle })
    } catch (error) {
        console.log("Some error :",error)
    }
})

Router.delete('/delBlog/:id',async(req,res) => {
    const { id } = req.params;

    try {
        await BlogModel.findByIdAndDelete(id);
        res.json({redirectUrl: '/'})
    } catch (error) {
        console.log("Some error :",error)
    }
})


export default Router;