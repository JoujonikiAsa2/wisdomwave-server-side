const mongoose = require("mongoose");

// Course Model Schema
const CourseContentSchema = new mongoose.Schema({
    title: String,
    content: String
});

const PurchasedCourseSchema = new mongoose.Schema({
    userEmail: String,
    courseId: String,
    paidStatus: Boolean,
    transactionId: String,
    courseDetails: {
        thumbnail: String,
        title: String,
        instructor: String,
        rating: Number,
        totalStudents: Number,
        creditHour: String,
        enrollFee: String,
        whatYouWillLearn: [String],
        courseDescription: String,
        languages: [String],
        introductoryVideo: String,
        outcome: [String],
        technologies: [String],
        skillsAcquired: [String],
        courseContents: [CourseContentSchema],
        requirements: [String],
        enrollmentDates: {
            enrollStart: Date,
            enrollEnd: Date
        },
        category: String,
        classStart: Date,
        subtitle: String,
        playlistId: String
    }
});

const PurchasedCourseModel = mongoose.model("purchasedCourses", PurchasedCourseSchema);
module.exports = PurchasedCourseModel