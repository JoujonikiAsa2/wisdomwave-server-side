const mongoose = require("mongoose");

const questionStructure = {
    question: String,
    options: Array,
    aswer: String
}
const QuizSchema = new mongoose.Schema({
    quizTitle: String,
    instructorEmail: String,
    quizScore: Number,
    questions: [questionStructure],
    obtainScore: Number
})

const QuizModel = mongoose.model('quizzes', QuizSchema)
module.exports = QuizModel