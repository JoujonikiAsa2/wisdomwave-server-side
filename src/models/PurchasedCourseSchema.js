const mongoose = require("mongoose");

// Course Model Schema
const CourseContentSchema = new mongoose.Schema(
    {
        title: String,
        content: String
    }
);

const liveClassesSchema = new mongoose.Schema(
    {
        date: String,
        Title: String,
        instructorEmail: String,
        link: String
    }
)

const PurchasedCourseSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    courseId: String,
    paidStatus: Boolean,
    transactionId: String,
    liveClasses: [liveClassesSchema],
    courseDetails: {
        thumbnail: String,
        instructorEmail: String,
        title: String,
        instructor: String,
        rating: Number,
        totalStudents: Number,
        totalVideo: Number,
        totalLiveClasses: Number,
        duration: Number,
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