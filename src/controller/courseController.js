// Course
const CourseModel = require("../models/CourseSchema");

// read course
exports.courses = async (req, res) => {
  try {
    const result = await CourseModel.find();
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// fetch unique category value from the database
exports.categories = async (req, res) => {
  try {
    const categories = await CourseModel.distinct('courseDetails.category').sort();
    // console.log('Categories:', categories);
    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    // console.error('Error finding', error);
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
};

// fetch individual data by id from the course database
exports.courseDetails = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await CourseModel.findById(courseId);
    console.log("User want to get course by Id")
    if (!course) {
      return res.status(404).json({ status: "Failed", message: "Course not found" });
    }

    res.status(200).json({ status: "success", data: course });
  } catch (error) {
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
};

