const UserModel = require("../models/UserSchema");

// create user api
exports.createUser = async (req, res) => {
    try {
        const email = req.body.email
        const filter = { email: email }
        console.log(req.body.email)
        console.log(req.body)
        const user = req.body
        const existingUser = await UserModel.findOne(filter)
        if (!existingUser) {
            const result = await UserModel.create(user)
            console.log({"create user": req.body.email})
            res.status(200).json({ status: "success", data: result });
        }
        else {
            console.log(req.body.email, "alreadyExist")
            res.status(200).json({ status: "success", data: 'Already Exist' });
        }

    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// update user api
exports.updateUser = async (req, res) => {
    try {
        const email = req.params.email;
        const filter = { email: email };
        const update = { verified: true };
        const options = { new: true };
        const result = await UserModel.findOneAndUpdate(filter, update, options);
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};



// read user api
exports.readUser = async (req, res) => {
    try {
        const result = await UserModel.find()
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// read user by email api
exports.readUserByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const filter = { email: email }
        const result = await UserModel.findOne(filter)
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

exports.deleteUser = async(req,res) =>{
    try{    
        const email = req.params.email
        const filter = { email: email }
        console.log(filter)
        const result = await UserModel.findOneAndDelete(filter)
        res.status(200).json({ status: "success", data: result });
    }catch(error){
        res.status(500).json({ status: "fail", message: error.message });
    }
}

exports.updateUserType = async (req, res) => {
    try {
        const email = req.params.email;
        const filter = { email: email };
        const update = { userType: 'admin' };
        const options = { new: true };
        const result = await UserModel.findOneAndUpdate(filter, update, options);
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}
