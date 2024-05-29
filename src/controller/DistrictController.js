const DisctrictModel = require("../models/DistrictSchema");

exports.readDistricts = async (req, res) => {
    try {
        const result = await DisctrictModel.find();
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
} 

exports.readDistrictByName = async (req, res) => {
    try {
        const name = req.params.name.toLowerCase()
        const result = await DisctrictModel.find({name: name});
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
} 