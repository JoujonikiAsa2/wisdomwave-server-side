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

const assignmentSchema = new mongoose.Schema({

    title: String,
    courseId: String,
    marks: Number,
    instructorEmail: String,
    questions: [quizQuestionPattern]
})

const AssignmentModel = mongoose.model('quizzes', assignmentSchema);
module.exports = AssignmentModel