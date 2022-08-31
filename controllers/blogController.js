
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