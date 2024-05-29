const TuitionModel = require("../models/TuitionSchema");

exports.tuitionCreate = async (req, res) => {
    try {
        const email = req.body.userEmail;
        const className = req.body.details.class;
        const filter = { userEmail: email, 'details.class': className };
        console.log(filter)
        const isExist = await TuitionModel.findOne(filter);
        
        if (isExist) {
            return res.status(400).send({ status: "fail", message: "Tuition already exists" });
        } else {
            const result = await TuitionModel.create(req.body);
            return res.status(200).send({ status: "success", data: result });
        }
    } catch (error) {
        console.error("Error creating tuition:", error);
        return res.status(500).send({ status: "fail", message: error.message });
    }
};
