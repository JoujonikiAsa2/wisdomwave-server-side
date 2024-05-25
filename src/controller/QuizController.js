const QuizModel = require("../models/QuizSchema")

// find quiz by email 
exports.readQuiz = async (req, res) => {
    try {
        const email = req.params.email
        const filter = { 'email': email }
        const result = await QuizModel.find(filter)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

// create quiz by find email and quiz title
exports.quizResponse = async (req, res) => {
    try {
        const quiz = req.body
        const filter = { 'studentEmail': quiz.studentEmail, 'instructorEmail': quiz.instructorEmail }
        const isExist = await QuizModel.findOne({ filter })
        if (isExist) {
            return res.status(404).json({ status: "Failed", message: "Quiz already exist" });
        }
        else {
            const result = await QuizModel.create(quiz)
            res.status(200).json({ status: "success", data: result })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}
