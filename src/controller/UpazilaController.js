const UpazilaModel = require("../models/UpazilaSchema");

exports.readUpazilas = async (req, res) => {
    try {
        const result = await UpazilaModel.find();
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
} 

exports.readUpazilasByDistrictId = async (req, res) => {
    try {
        console.log(req.params.id)
        const result = await UpazilaModel.find({"district_id": req.params.id});
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}