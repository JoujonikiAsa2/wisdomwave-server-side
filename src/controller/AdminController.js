const CourseModel = require("../models/CourseSchema")
const TuitionModel = require("../models/TuitionSchema")

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

// read tuition details
exports.tuitionDetails = async (req, res) => {
    try {
        const email = req.params.email;
        console.log(req.body)
        const className = req.body.class
        const subjects = req.body.subjects
        const filter = { userEmail: email, 'details.class': className, 'details.subjects': subjects };
        console.log(filter)
        const result = await TuitionModel.findOne(filter);
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

// update tuition details
exports.tuitionUpdate = async (req, res) => {
    try {
        const email = req.params.email;
        const className = req.body.checkDetails.class
        const subjects = req.body.checkDetails.subjects
        const filter = { userEmail: email, 'details.class': className, 'details.subjects': subjects };
        console.log(req.body)
        const update = req.body;
        console.log(filter)
        const options = { new: false };
        console.log("Update", update)
        const result = await TuitionModel.findOneAndUpdate(filter, update, options);
        console.log(result)
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

// remove tuition api
exports.tuitionRemove = async (req, res) => {
    try {
        console.log("Hit at delete")
        const tuitionCode = req.params.tuitionCode;
        const filter = { tuitionCode: tuitionCode };
        console.log("delete", filter)
        const result = await TuitionModel.findOneAndDelete(filter);
        console.log(result)
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}