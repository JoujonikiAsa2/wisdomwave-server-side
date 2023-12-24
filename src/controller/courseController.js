// Course
const CourseModel = require("../models/CourseSchema");

// read course
exports.courses = async (req, res) => {
  try {
    const result = await CourseModel.find();
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

// 
exports.categories = async (req, res) => {
  try {
    const categories = await CourseModel.distinct('courseDetails.category').sort();
    // console.log('Categories:', categories);
    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    // console.error('Error finding', error);
    res.status(500).json({ status: "Failed to fetch", data: error.message });
  }
};
