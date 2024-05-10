const mongoose = require("mongoose")

const AnnouncementSchema = new mongoose.Schema({
    title: String,
    message: String,
    email: String,
})

const AnnouncementModel = mongoose.model('announcements', AnnouncementSchema)
module.exports = AnnouncementModel