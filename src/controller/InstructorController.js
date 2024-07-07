const PurchasedCourseModel = require("../models/PurchasedCourseSchema")

//  read student info by searching courseDetails.instructorEmail and 
exports.enrolledStudents = async(req,res) =>{
    try {
        const email = req.params.instructorEmail
        const result = await PurchasedCourseModel.find({"courseDetails.instructorEmail": email})
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "failed to fetch", data: error })
    }
}


exports.totalStudents = async(req,res) =>{
    // count total students by searching courseDetails.instructorEmail
    try {
        const email = req.params.instructorEmail
        const result = await PurchasedCourseModel.countDocuments({"courseDetails.instructorEmail": email})
        res.status(200).json({ status: "success", data: result })
    }
    catch (error) {
        res.status(500).json({ status: "failed to fetch", data: error })
    }
}

exports.purchasedById = async(req,res) =>{
    try {
        const id = req.params.id
        console.log(id)
        const result = await PurchasedCourseModel.findOne({courseId: id})
        console.log(result)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "failed to fetch", data: error })
    }
}