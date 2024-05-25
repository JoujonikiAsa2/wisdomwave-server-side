const TuitionModel = require("../models/TuitionSchema");
const TutorMessageModel = require("../models/TutorMessageSchema");
const TutorProfileModel = require("../models/TutorProfileSchema");
const nodemailer = require('nodemailer')

exports.createProfile = async (req, res) => {
    try {
        const email = req.params.userEmail
        const tutorProfile = req.body
        const isExist = await TutorProfileModel.findOne({ 'email': email })
        if (isExist) {
            res.status(400).json({ status: "fail", message: "Tuition already exist" })
        }
        else {
            const result = await TutorProfileModel.create(tutorProfile)
        res.status(200).json({ status: "success", data: result })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

exports.tuitions = async (req, res) => {
    try {
        const result = await TuitionModel.find({}, '-__v');
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// individual tutor's api
exports.tutorDetails = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const filter = { _id: id }
        const result = await TutorProfileModel.findById(filter);
        // console.log(result)
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}


// all requested tuitions
exports.requestedTuitionByTutorEmail = async (req, res) => {
    try {
        const email = req.params.tutorEmail
        const filter = {email: email}
        const result = await TutorMessageModel.find(filter);
        res.status(200).send({ status: "success", data: result });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ status: "fail", message: error.message });
    }

}

// update the responseStatus into responsed by seraching email, tutorEmail

exports.updateResponse = async (req, res) => {
    try {
        const tutorEmail = req.params.tutorEmail
        const email = req.params.email
        const filter = { 'email': email, 'tutorEmail': tutorEmail }
        const result = await TutorMessageModel.updateOne(filter, { $set: { responseStatus: 'responed' } });
        res.status(200).send({ status: "success", data: result });
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message });
    }
}
