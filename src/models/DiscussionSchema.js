const mongoose = require('mongoose')

const DiscussionSchema = new mongoose.Schema({
    userProfile: String,
    userName: String,
    discussionCategory: String,
    discussionTitle: String,
    content: String,
    date: String,
    email: String,
    comments: [Object],
    replies: [Object],
})

const DiscussionModel = mongoose.model('discussion', DiscussionSchema)
module.exports = DiscussionModel 