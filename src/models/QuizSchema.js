const mongoose = require('mongoose');

const quizQuestionPattern = new mongoose.Schema({
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String,
  point: Number
})

const quizSchema = new mongoose.Schema({
  studentEmail: String,
  quizTitle: String,
  instructorEmail: String,
  courseId: String,
  score: Number,
  questions: [quizQuestionPattern],
  answers: [String]
})

const QuizModel = mongoose.model('quiz', quizSchema);

module.exports = QuizModel;
