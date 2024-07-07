const StudentMessageModel = require("../models/StudentMessageSchema");
const TuitionModel = require("../models/TuitionSchema");
const TutorMessageModel = require("../models/TutorMessageSchema");
const TutorProfileModel = require("../models/TutorProfileSchema");
const nodemailer = require('nodemailer')

// read profile 
exports.tutorProfile = async (req, res) => {
    try {
        const email = req.params.userEmail
        console.log(email)
        const result = await TutorProfileModel.findOne({ 'email': email })
        res.status(200).json({ status: "success", data: result })

    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

// photo update a

exports.updatePhoto = async (req, res) => {
    try {
        const email = req.params.userEmail;
        const { profile } = req.body;
        
        console.log(`Updating photo for email: ${email}`);
        console.log(`New profile photo: ${profile}`);

        const result = await TutorProfileModel.findOneAndUpdate(
            { email },
            { profile },
            { new: false }
        );

        if (!result) {
            return res.status(404).json({ status: "fail", message: "Profile not found" });
        }

        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        console.error(`Error updating photo: ${error.message}`);
        res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.updateInfo = async (req, res) => {
    try {
        const email = req.params.userEmail;

        const search = await TutorProfileModel.findOne({ email });

        const bodyData = {
            name: req.body.name,
                age: req.body.age,
                profile: search.profile,
                currentStatus: req.body.currentStatus,
                educationalQualication: {
                    eduName: req.body.educationalQualication.eduName,
                    subject: req.body.educationalQualication.subject,
                    institute: req.body.educationalQualication.institute,
                    cgpa: req.body.educationalQualication.cgpa,
                },
                medium: req.body.medium,
                preferableLocation: req.body.preferableLocation,
                subLocation: req.body.subLocation,
                preferableClass: req.body.preferableClass,
                preferableSubject: req.body.preferableSubject,
                experience:req.body.experience,
                expectedSalary: req.body.expectedSalary,
                profileCreationDate: new Date(),
                about: req.body.about,
                tuitionType: req.body.tuitionType,
                tuitionDays: req.body.tuitionDays,
                email: req.body.email
        }

        console.log(bodyData)

        const result = await TutorProfileModel.findOneAndUpdate(
            { email },
            bodyData,
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ status: "fail", message: "Profile not found" });
        }

        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        console.error(`Error updating info: ${error.message}`);
        res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const email = req.params.userEmail
        const result = await TutorProfileModel.deleteOne({ 'email': email })
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

// // find tuition request send by the tutor
// exports.tuitionsByTutorEmail = async (req, res) => {
//     try {
//         const email = req.params.tutorEmail
//         const result = await TuitionModel.find({ 'tutorEmail': email })
//         res.status(200).json({ status: "success", data: result })
//     } catch (error) {
//         res.status(500).json({ status: "fail", message: error.message });
//     }
// }

// create profile
exports.createProfile = async (req, res) => {
    try {
        const email = req.params.userEmail
        const tutorProfile = req.body
        console.log(email)

        const isExist = await TutorProfileModel.findOne({ 'email': email })
        if (isExist) {
            console.log({ message: "Profile already created" })
            res.status(200).json({ status: "fail", message: "Profile already created" })
        }
        else {
            console.log("created")
            const result = await TutorProfileModel.create(tutorProfile)
            console.log(result)
            res.status(400).json({ status: "success", data: result })
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


// all requested tuitions by student
exports.requestedTuitionByTutorEmail = async (req, res) => {
    try {
        console.log("Hello")
        const email = req.params.tutorEmail
        const filter = { tutorEmail: email }
        const result = await TutorMessageModel.find(filter);
        const count = await TutorMessageModel.countDocuments(filter);
        res.status(200).send({ status: "success", data: result, count: count });

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

exports.tuitionMessageFromTutor = async (req, res) => {

    try {
        const email = req.params.email  
        const filter = { tutorEmail: email }
        const result = await StudentMessageModel.find(filter);
        const count = await StudentMessageModel.countDocuments(filter);
        res.status(200).send({ status: "success", data: result, count: count });

    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message });
    }
}

// get tuition request from tuttion post
exports.getTuitionRequestFromStudent = async (req, res) => {

    try {
        const email = req.params.email
        const filter = { studentEmail: email }
        const result = await StudentMessageModel.find(filter);
        const count = await StudentMessageModel.countDocuments(filter);
        res.status(200).send({ status: "success", data: result, count});
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message });
    }

}


