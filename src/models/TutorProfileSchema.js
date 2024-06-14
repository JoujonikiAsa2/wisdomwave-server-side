const mongoose = require("mongoose");

const eduBg = new mongoose.Schema({
    eduName: String,
    subject: String,
    institute: String,
    cgpa: String
});

const TutorProfileSchema = new mongoose.Schema({
    tutorId: String,
    name: String,
    age: String,
    currentStatus: String,
    profile: String,
    educationalQualication:eduBg,
    medium: [String],
    preferableLocation: [String],
    subLocation: [String],
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