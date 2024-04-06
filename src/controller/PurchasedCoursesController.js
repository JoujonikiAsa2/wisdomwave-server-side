const PurchasedCourseModel = require("../models/PurchasedCourseSchema")

exports.PurchasedCourses = async (req, res) => {
    try {
        const email = req.params.email
        const query = {userEmail: email}
        const purchasedCourses = await PurchasedCourseModel.find(query)
        res.status(200).json({ status: "success", data: purchasedCourses })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}