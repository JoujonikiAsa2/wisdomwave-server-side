// Course
const CourseModel = require("../models/CourseSchema");
const PurchasedCourseModel = require("../models/PurchasedCourseSchema");
const RatingModel = require("../models/RatingScema");

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
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const skip = page * size
    const result = await CourseModel.find().skip(skip).limit(size);
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
    console.log(update)
    const options = { new: false };
    const course = await CourseModel.findByIdAndUpdate(id, update, options);
    console.log("course");
    const purchasedCourse = await PurchasedCourseModel.findByIdAndUpdate({ courseId: id }, update, options);
    console.log("course");
    res.status(200).json({ status: "success", data: course, purchasedCourse: purchasedCourse });
  } catch (error) {
    res.status(500).json({ status: "Failed to update", message: error.message });
  }
};

// update rating when someone submit their rating
exports.updateRating = async (req, res) => {
  try {
    const id = req.params.courseId;
    const options = { new: true }; // Return the updated document
    const isRatingExist = await RatingModel.findOne({ courseId: id, studentEmail: req.body.studentEmail });

    console.log(isRatingExist)
    if (!isRatingExist) {
      const course = await CourseModel.findByIdAndUpdate(id, { $inc: { "courseDetails.rating": 1 } }, options);
      const purchasedCourse = await PurchasedCourseModel.findOneAndUpdate({ courseId: id }, { $inc: { "courseDetails.rating": 1 } }, options);
      const createRating = await RatingModel.create(req.body);
      console.log(course.courseDetails.rating, purchasedCourse.courseDetails.rating)

      return res.status(200).json({ status: "success", data: { course, purchasedCourse, ratings: createRating } });
    } else {
      return res.status(400).json({ status: "fail", message: "You already rated this course" });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

// get all ratings
exports.totalRatings = async (req, res) => {
  try {
    const result = await RatingModel.find();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "Failed to fetch", message: error.message });
  }
}




