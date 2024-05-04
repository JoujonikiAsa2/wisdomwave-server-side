const mongoose = require("mongoose")

const InstructorSchema = new mongoose.Schema({
    name: String,
    email: String,
    profilePicture: String,
    biography: String,
    facebook:String,
    twiter:String,
    linkedin: String,
    userType: String,
    phoneNumber: String,
    verified: Boolean
})

const InstructorModel = mongoose.model('instructors', InstructorSchema)
module.exports = InstructorModel