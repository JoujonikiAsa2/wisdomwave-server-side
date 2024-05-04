const DiscussionModel = require("../models/DiscussionSchema");

// create a discussion post
exports.discussionPost = async (req, res) => {
    try {
        const discussion = req.body
        const result = await DiscussionModel.create(discussion)
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// read all discussions
exports.discussionsRead = async (req, res) => {
    try {
        const result = await DiscussionModel.find({}, '-__v');
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// read a discussion by id
exports.discussionReadById = async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: id }
        const result = await DiscussionModel.findOne(query);
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

// post reply api
exports.replyPost = async (req, res) => {
    try {
        // console.log("You hit on like api")
        const id = req.params.id;
        const response = req.body;
        // console.log(response)
        if(response.isComment == true){
            const result = await DiscussionModel.findByIdAndUpdate(
                id,
                {
                    $push:
                    {
                        comments: response
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            );
            res.status(200).json({ status: "success", data: result });
        }
        else{
            const result = await DiscussionModel.findByIdAndUpdate(
            id,
                {
                    $push:
                    {
                        replies: response
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            );
            res.status(200).json({ status: "success", data: result });
        }
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}