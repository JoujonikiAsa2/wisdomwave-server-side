const mongoose = require("mongoose");

// Course Model Schema
const CourseContentSchema = new mongoose.Schema({
  title: String,
  content: String
});

const enrollmentDatesSchema = new mongoose.Schema({
  enrollStart: Date,
  enrollEnd: Date
});

const CourseSchema = new mongoose.Schema({
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
    enrollFee: Number, 
    whatYouWillLearn: [String],
    courseDescription: String,
    languages: [String],
    introductoryVideo: String,
    courseContents: [CourseContentSchema], 
    requirements: [String],
    enrollmentDates: enrollmentDatesSchema, 
    category: String,
    classStart: Date,
    subtitle: String,
    playlistId: String
  }
});

const CourseModel = mongoose.model("courses", CourseSchema);
module.exports = CourseModel