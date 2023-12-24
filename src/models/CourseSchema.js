const mongoose = require("mongoose");

// Course Model Schema
const CourseSchema = mongoose.Schema(
    {
        thumbnail: { type: String, required: true },
        title: { type: String, required: true },
        instructor: { type: String, required: true },
        rating: { type: Number, required: true },
        limitOfStudents: { type: Number, required: true },
        credit: { type: String, required: true },
        enrollFee: { type: String, required: true },
        category: { type: String, required: true },
        whatYouWillLearn: { type: [String], required: true },
        courseDescription: { type: String, required: true },
        outcome: { type: String, required: true },
        projects: { type: [String], required: true },
        technologies: { type: [String], required: true },
        skillsAcquired: { type: [String], required: true },
        courseContent: { type: String, required: true },
        requirements: { type: [String], required: true },
        enrollmentDates: {
            enrollStart: { type: Date, required: true },
            enrollEnd: { type: Date, required: true },
        },
    },
);
const CourseModel = mongoose.model("courses", CourseSchema);
module.exports = CourseModel