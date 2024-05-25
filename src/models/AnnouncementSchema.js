const mongoose = require("mongoose")

const AnnouncementSchema = new mongoose.Schema({
    title: String,
    details: String,
    email: String,
    studentEmails: [{email:String, isRead: Boolean}]
})

const AnnouncementModel = mongoose.model('announcements', AnnouncementSchema)
module.exports = AnnouncementModel