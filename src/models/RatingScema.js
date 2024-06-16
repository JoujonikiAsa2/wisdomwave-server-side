const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    studentEmail: String,
    studentName: String,
    studentProfile : String,
    rating: Number,
    courseId: String,
    comment: String
});

const RatingModel = mongoose.model('Ratings', RatingSchema);

module.exports = RatingModel