const mongoose = require("mongoose");

// Define TutorMessage schema
const TutorMessageSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    studentEmail: String,
    tutionType: String,
    tutorEmail: String,
    message: String,
    responseStatus: String
});

// Create TutorMessage model
const TutorMessageModel = mongoose.model('TutorMessage', TutorMessageSchema);

module.exports = TutorMessageModel;

