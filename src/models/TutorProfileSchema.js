const mongoose = require("mongoose");

const TutorProfileSchema = new mongoose.Schema({
    name: String,
    age: String,
    currentStatus: String,
    profile: String,
    institute: String,
    educationalQualication:[String],
    medium: String,
    preferableLocation: String,
    preferableClass: [String],
    preferableSubject: [String],
    experience: Number,
    expectedSalary: String,
    profileCreationDate: String,
    about: String,
    tuitionType: [String],
    tuitionDays: Number,
    email: String
});

const TutorProfileModel = mongoose.model('tutorProfiles', TutorProfileSchema);
module.exports = TutorProfileModel;