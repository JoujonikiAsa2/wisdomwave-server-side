// Course
const CourseModel = require("../models/CourseSchema");

// total category
exports.totalCategory = async (req, res) => {
  try {
    const categories = await CourseModel.distinct('courseDetails.category').sort();
    res.status(200).json({ status: "success", data: categories.length });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
// total course
exports.totalCourse = async (req, res) => {
  try {
    const result = await CourseModel.estimatedDocumentCount();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// read course
exports.courses = async (req, res) => {
  try {
    const result = await CourseModel.find();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
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

// fetch unique category value from the database
exports.searchedCategories = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase()
    // console.log(category)
    const searchedCategories = await CourseModel.find({ 'courseDetails.category': category });
    // console.log('Categories:', categories);
    res.status(200).json({ status: "success", data: searchedCategories });
  } catch (error) {
    // console.error('Error finding', error);
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
};


exports.searchCourses = async (req, res) => {
  try {
    const searchValue = req.params.searchValue;
    console.log(searchValue);
    const splitedKeywords = searchValue.split(" ");

    // Construct an array of regex
    const regexQueries = splitedKeywords.map(keyword => new RegExp(keyword, 'i'));

    // Search for courses where each keyword matches part of the title
    const searchedCourses = await CourseModel.find({
      'courseDetails.title': { $in: regexQueries }
    });

    res.status(200).json({ status: "success", data: searchedCourses });
  } catch (error) {
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
};


// fetch individual data by id from the course database
exports.courseDetails = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await CourseModel.findById(courseId);
    // console.log("User want to get course by Id")
    if (!course) {
      return res.status(404).json({ status: "Failed", message: "Course not found" });
    }

    res.status(200).json({ status: "success", data: course });
  } catch (error) {
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
};

// get course by instructorEmail
exports.findCourseByEmail = async (req, res) => {
  try {
    const email = req.params.instructorEmail;
    const filter = { 'courseDetails.instructorEmail': email }
    const course = await CourseModel.find(filter);
    // console.log("User want to get course by Id")
    if (!course) {
      return res.status(404).json({ status: "Failed", message: "Course not found" });
    }

    res.status(200).json({ status: "success", data: course });
  } catch (error) {
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
};

// Create course
exports.createCourse = async (req, res) => {
  try {
    console.log("user hit to create course")
    const courseInfo = req.body
    // console.log(courseInfo.courseDetails.title)
    const isExist = await CourseModel.findOne({ 'courseDetails.title': courseInfo.courseDetails.title, 'courseDetails.instructorEmail': courseInfo.courseDetails.instructorEmail });
    
    if (isExist) {
      console.log("Course already exist")
      return res.status(404).json({ status: "Failed", message: "Course already exist" });
    }
    else {
      console.log("Course not exist")
      const course = await CourseModel.create(courseInfo);
      // console.log(course)
      res.status(200).json({ status: "success", data: course });
    }
  } catch (error) {
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
}
//  find by email first and if email match then delete the course
exports.deleteCourse = async (req, res) => {
  try {
    console.log('hitted delete')
    const email = req.params.instructorEmail;
    const filter = { 'courseDetails.instructorEmail': email }
    const course = await CourseModel.find(filter);
    if (course) {
      const id = req.params.id
      const filteredId = { _id: id }
      const result = await CourseModel.deleteOne(filteredId);
      // console.log(result)
      res.status(200).json({ status: "success", data: course });
    }
  } catch (error) {
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
}

// update course api
exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body; 
    const options = { new: false };
    const course = await CourseModel.findByIdAndUpdate(id, update, options); 
    console.log("course");
    res.status(200).json({ status: "success", data: course });
  } catch (error) {
    res.status(500).json({ status: "Failed to update", message: error.message });
  }
};



