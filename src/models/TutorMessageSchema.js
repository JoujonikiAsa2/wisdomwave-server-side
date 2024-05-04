const mongoose = require("mongoose");

// Define TutorMessage schema
const TutorMessageSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    tutionType: String,
    tutorEmail: String,
    responseStatus: String
});

// Create TutorMessage model
const TutorMessageModel = mongoose.model('TutorMessage', TutorMessageSchema);

module.exports = TutorMessageModel;

