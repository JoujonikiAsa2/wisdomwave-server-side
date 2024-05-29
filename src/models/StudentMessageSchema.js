const mongoose = require("mongoose");

// Define TutorMessage schema
const StudentMessageSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    studentEmail: String,
    tutionType: String,
    tutorEmail: String,
    message:String,
    responseStatus: String
});

// Create TutorMessage model
const StudentMessageModel = mongoose.model('StudentMessage', StudentMessageSchema);

module.exports = StudentMessageModel;

