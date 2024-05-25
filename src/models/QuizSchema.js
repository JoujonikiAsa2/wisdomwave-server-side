const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  studentEmail: String,
  instructorEmail: String,
  courseId: String,
  score: Number,
});

const QuizModel = mongoose.model('quiz', quizSchema);

module.exports = QuizModel;
