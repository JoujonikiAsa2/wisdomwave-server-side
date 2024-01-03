const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    bloggerName: String,
    facebookLink: String,
    githubLink: String,
    linkedinLink: String,
    blogCategory: String,
    blogTitle: String,
    blogContent: String,
    documnetReadingTime: Number
})

const BlogModel = mongoose.model('blogs', BlogSchema)
module.exports = BlogModel 