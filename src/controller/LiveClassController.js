const PurchasedCourseModel = require("../models/PurchasedCourseSchema");

// live class api
exports.createLiveClass = async (req, res) => {
    try {
        const id = req.params.id
        const liveClass = req.body
        const filter = { courseId: id }
        const options = { new: false }
        const result = await PurchasedCourseModel.updateMany(filter, { $push: { 'liveClasses': liveClass } }, options)
        console.log(result)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}
