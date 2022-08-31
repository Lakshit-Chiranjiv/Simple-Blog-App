import BlogModel from "../models/blogModel"

//get all blogs
const getAllBlogs = (req,res)=>{
    try {
        BlogModel.find().sort({ createdAt: -1 })
        .then(blogs => res.render('home',{ title: 'Home' , blogs}))
        .catch(err => console.log(err))
    } catch (error) {
        console.log("Some error :",error)
    }
    // res.sendFile('/views/home.html', { root: __dirname })
} 

//render create page
const renderCreatePage = (req,res)=>{
    res.render('create',{ title: 'Create' })
}

//render about page
const renderAboutPage = (req,res)=>{
    // res.sendFile('/views/about.html', { root: __dirname })
    res.render('about',{ title: 'About' })
}