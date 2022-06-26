import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogBody: {
        type: String,
        required: true
    },
    readBy: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: [],
    }
},{ timestamps: true })

const BlogModel = mongoose.model('blog',blogSchema)

export default BlogModel;