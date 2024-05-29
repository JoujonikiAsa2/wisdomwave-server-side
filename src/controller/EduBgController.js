const EduLevelModel = require("../models/EduLevelSchema");
const InstituteModel = require("../models/InstituteSchema");
const SubjectModel = require("../models/SubjectSchema");

exports.institutes = async (req, res) => {
    try {
        const result = await InstituteModel.find();
        res.status(200).json( result );
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

exports.eduLevels = async (req, res) => {
    try {
        const result = await EduLevelModel.find();
        res.status(200).json( result );
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}
exports.subjects =  async (req, res) => {
    try {
        const result = await SubjectModel.find();
        res.status(200).json( result );
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}