const AssignmentModel = require('../models/AssignmentSchema')
exports.createAssaignment = async (req, res) => {
    try {
        const quiz = req.body
        
        console.log(quiz)
        const result = await AssignmentModel.create(quiz)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

// read assignment
exports.assignments = async (req, res) => {
    try {
        const quiz = req.params
        const {id, title} = quiz
        const filter = {courseId: id, title: title}
        // console.log(filter)
        const result = await AssignmentModel.findOne(filter)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}