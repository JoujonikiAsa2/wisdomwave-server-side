const TuitionModel = require("../models/TuitionSchema");
const TutorMessageModel = require("../models/TutorMessageSchema");
const TutorProfileModel = require("../models/TutorProfileSchema");
const nodemailer = require('nodemailer')

// all tuitons api
exports.tuitions = async (req, res) => {
    try {
        const result = await TuitionModel.find({}, '-__v');
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// create tuiton api
exports.createTuitions = async (req, res) => {
    try {
        const tuition = req.body
        const result = await TuitionModel.create(tuition);
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// all tutors api
exports.tutors = async (req, res) => {
    try {
        const result = await TutorProfileModel.find({}, '-__v');
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
                email: userEmail,
                tutionType: type,
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

// all requested tuitions
exports.requestedTuition = async (req, res) => {
    try {
        const email = req.params.email
        const filter = {email: email}
        const result = await TutorMessageModel.find(filter);
        res.status(200).send({ status: "success", data: result });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ status: "fail", message: error.message });
    }

}
