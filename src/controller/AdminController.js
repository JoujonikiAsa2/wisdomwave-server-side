const CourseModel = require("../models/CourseSchema")

exports.deleteCourseAdmin = async (req, res) => {
    try {
        const id = req.params.id
        const result = await CourseModel.findByIdAndDelete(id)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

exports.searchCourseAdmin = async (req, res) => {
    try {
        const query = req.params.email
        console.log(query)
        const result = await CourseModel.find({"courseDetails.instructorEmail": query})
        console.log(result)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}
