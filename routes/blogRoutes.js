import express from 'express'
import { addBlog,deleteBlog,getAllBlogs,getSingleBlog,redirectAboutPage,renderAboutPage,renderContactPage,renderCreatePage } from './../controllers/blogController.js'

const Router = express.Router()


Router.get('/',getAllBlogs)

Router.get('/create',renderCreatePage)

Router.get('/about',renderAboutPage)

Router.get('/contact',renderContactPage)

Router.get('/aboutme',redirectAboutPage)

Router.post('/addblog',addBlog)

Router.get('/blogs/:id',getSingleBlog)

Router.delete('/delBlog/:id',deleteBlog)


export default Router;