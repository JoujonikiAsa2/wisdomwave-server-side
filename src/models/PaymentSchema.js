const mongoose = require("mongoose");

const CourseContentSchema = new mongoose.Schema(
    {
        title: String,
        content: String
    }
);

const paymentSchema = new mongoose.Schema({
    userEmail: String,
    courseTitle: String,
    courseFee: Number,
    transactionId: String,
    courseId: String,
    paidStatus: Boolean,
    date: String,
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
})

const PaymentModel = mongoose.model("payments", paymentSchema);
module.exports = PaymentModel