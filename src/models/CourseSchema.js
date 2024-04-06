const mongoose = require("mongoose");

// Course Model Schema
const CourseContentSchema = new mongoose.Schema({
    title: String,
    content: String
  });
  
  const CourseSchema = new mongoose.Schema({
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
  
const CourseModel = mongoose.model("courses", CourseSchema);
module.exports = CourseModel