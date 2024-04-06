const mongoose = require("mongoose")

const LikesSchema =  new mongoose.Schema({
    userId: String,
})

const LikesModel = mongoose.model('Likes', LikesSchema)

module.exports = LikesModel