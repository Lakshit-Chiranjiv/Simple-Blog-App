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

//render contact page
const renderContactPage = (req,res)=>{
    res.render('contact',{ title: 'Contact' })
}

//redirect to about page
const redirectAboutPage = (req,res)=>{
    res.redirect('/about')
}

//add a blog
const addBlog = (req,res) => {
    const blog = new BlogModel(req.body)
    blog.save()
        .then((result)=>{
            console.log(result)
            res.json({redirectUrl: '/'})
        })
        .catch((err)=>{
            console.log("Some error",err);
        })
}

//get Single Blog
const getSingleBlog = async(req,res) => {
    const { id } = req.params;

    try {
        const blog = await BlogModel.findById(id)
        const updateResult = await BlogModel.findByIdAndUpdate(id,{ $inc: { readBy: 1 } })
        res.render('details', { blog, title: blog.blogTitle })
    } catch (error) {
        console.log("Some error :",error)
    }
}

//delete blog
const deleteBlog = async(req,res) => {
    const { id } = req.params;

    try {
        await BlogModel.findByIdAndDelete(id);
        res.json({redirectUrl: '/'})
    } catch (error) {
        console.log("Some error :",error)
    }
}