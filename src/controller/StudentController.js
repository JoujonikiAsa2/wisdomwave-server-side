
const TutorMessageModel = require("../models/TutorMessageSchema")
const TutorProfileModel = require("../models/TutorProfileSchema")
const TuitionModel = require("../models/TuitionSchema")
const nodemailer = require('nodemailer');

// search tutions by email
exports.tuitionsByEmail = async (req, res) => {
    try {
        const email = req.params.userEmail
        const result = await TuitionModel.find({ 'userEmail': email })
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// all tutors api
exports.tutors = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const size = parseInt(req.query.size)
        const skip = page * size; 
        const result = await TutorProfileModel.find({}, '-__v').skip(skip).limit(size);
        const count = await TutorProfileModel.countDocuments();
        res.status(200).json({ status: "success", data: result, total: count });
        // console.log(result, count)
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
} 

exports.createTuitions = async (req, res) => {
    try {
        const isExist = await TuitionModel.findOne({ 'userEmail': req.body.email })
        if (isExist) {
            res.status(400).json({ status: "fail", message: "Tuition already exist" })
        }
        else {
            const result = await TuitionModel.create(req.body)
        res.status(200).json({ status: "success", data: result })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

exports.requestedTuition = async (req, res) => {
    try {
        const email = req.params.email
        const filter = {studentEmail: email}
        console.log("You are hitting at requestedTuition")
        const result = await TutorMessageModel.find(filter);
        res.status(200).send({ status: "success", data: result });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ status: "fail", message: error.message });
    }

}

exports.messageTutor = async (req, res) => {
    const { name, phone, email, message, userEmail, type, responseStatus } = req.body;

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
                from: `WisdomWave "<${email}>"`,
                to: `${email}`,
                subject: "Tuition request from WisdomWave",
                // text: ,
                html: `
<pre>
You got a tuition request from <b>${name}</b>
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
                studentEmail: userEmail,
                tutionType: type,
                message:message,
                tutorEmail: email,
                responseStatus: responseStatus,
            }
            const response = TutorMessageModel.create(messageState)
            res.status(200).send({ status: "success", data: "Message Send Successfuly!" });
        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).send({ status: "fail", message: error.message });
        }
    }

    sendEmail();
};


