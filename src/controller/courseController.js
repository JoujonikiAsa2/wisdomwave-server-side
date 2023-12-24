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