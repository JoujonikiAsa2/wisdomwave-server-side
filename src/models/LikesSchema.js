const mongoose = require("mongoose")

const LikesSchema =  new mongoose.Schema({
    userId: String,
    discussionId: String
})

const LikesModel = mongoose.model('Likes', LikesSchema)

module.exports = LikesModel