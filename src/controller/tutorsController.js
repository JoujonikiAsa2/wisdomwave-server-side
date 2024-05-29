const StudentMessageModel = require("../models/StudentMessageSchema");
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
        console.log("Hello")
        const email = req.params.tutorEmail
        const filter = {tutorEmail: email}
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

exports.messageStudent = async (req, res) => {
    const { name, phone, studentEmail, message, userEmail, type, responseStatus } = req.body;

    var myemail = process.env.SENDER_EMAIL;
    var mypassword = process.env.APPLICATION_PASSWORD;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: myemail,
            pass: mypassword,
        },
    });

    // async function to send email
    async function sendEmail() {
        try {
            const info = await transporter.sendMail({
                from: `WisdomWave "<${studentEmail}>"`,
                to: `${studentEmail}`,
                subject: "Tuition post response from WisdomWave",
                // text: ,
                html: `
<pre>
You got a tuition post response from <b>${name}</b>
<strong>Message from student: </strong><i>${message}</i>
<b>Contact Info:</b>
    Name: ${name}
    Phone: ${phone}
    Email: ${userEmail}
</pre>  
    
                `,
            });

            console.log("Message sent: %s", info.messageId);
            const messageState = {
                name: name,
                phoneNumber: phone,
                studentEmail: studentEmail,
                tutorEmail: userEmail,
                message: message,
                responseStatus: responseStatus,
            }
            const response = StudentMessageModel.create(messageState)
            res.status(200).send({ status: "success", data: "Message Send Successfuly!" });
        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).send({ status: "fail", message: error.message });
        }
    }

    sendEmail();
};

// get tuition request from tuttion post
exports.getTuitionRequestFromTutor = async (req, res) => {

    try {
        const email = req.params.email
        const filter = { studentEmail: email }
        const result = await StudentMessageModel.find(filter);
        res.status(200).send({ status: "success", data: result });
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message });
    }

}
 

