const TuitionModel = require("../models/TuitionSchema");

exports.tuitionCreate = async (req, res) => {
    try {
        const email = req.body.userEmail;
        const className = req.body.details.class;
        const subjects = req.body.details.subjects;

        const totalDocs = await TuitionModel.countDocuments() + 1
        const tuitionCode = `tuition0j${totalDocs}`

        const {userEmail, district, area, group, medium, tutoringDays, salary, details} = req.body

        const tuitionData = {
            userEmail,
            tuitionCode,
            district,
            area,
            group,
            medium,
            tutoringDays,
            salary,
            details
        }

        const filter = { userEmail: email, 'details.class': className, 'details.subjects': subjects };
        console.log(filter)

        const isExist = await TuitionModel.findOne(filter);
        
        if (!isExist) {
            const result = await TuitionModel.create(tuitionData);
            return res.status(200).send({ status: "success", data: result });
        } else {
            return res.status(400).send({ status: "fail", message: "Tuition already exists" });
        }
    } catch (error) {
        console.error("Error creating tuition:", error);
        return res.status(500).send({ status: "fail", message: error.message });
    }
};


