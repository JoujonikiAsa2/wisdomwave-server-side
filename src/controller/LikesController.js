const LikesModel = require("../models/LikesSchema")

exports.likes = async (req, res) => {
    try {
        console.log("You hit on like api of likes");
        const userId = req.body;
        const query = { userId: userId.userId };
        const existing = await LikesModel.findById(query);
        if (existing) {
            res.status(500).json({ status: "Failed", data: "Already Liked" });
        }
        const result = await LikesModel.create(userId);
        res.status(200).json({ status: "success", data: "result" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};


// exports.DeleteLikes = async(req,res) =>{
//     try {
//         console.log("You hit on like api")
//         const userId = req.params.email
//         const query = { userId: userId }
//         const result = await LikesModel.deleteOne(query);
//         res.status(200).json({ status: "success", data: result });
//     } catch (error) {
//         res.status(500).json({ status: "fail", message: error.message });
//     }
// }