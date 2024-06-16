const DiscussionModel = require("../models/DiscussionSchema");
const LikesModel = require("../models/LikesSchema");

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
        // console.log(result.data)
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
        if (response.isComment == true) {
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
        else {
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

exports.deleteDiscussion = async (req, res) => {
    try {
        const id = req.params.id
        const email = req.params.email
        console.log("Dit on the delete discussion api")
        const find = await DiscussionModel.findById(id)
        // console.log(find)
        if (find.email === email) {
            const result = await DiscussionModel.findByIdAndDelete(id)
            return res.status(200).json({ status: "success", data: result });
        }
        else {
            res.status(200).json({ status: "fail", data: "Not Authorized" });
        }
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}
exports.discussionLikes = async (req, res) => {
    try {
        const id = req.params.id;
        const email = req.body.userId;
        console.log("Hit at likes", email, req.body);

        const find = await LikesModel.findOne({ userId: email, discussionId: id });

        if (!find) {
            // User has not liked the discussion yet, so we increment the like count
            const result = await DiscussionModel.findOneAndUpdate(
                { _id: id },
                { $inc: { "likes": 1 } },
                { new: true }
            );

            const likeEmail = await LikesModel.create({ userId: email, discussionId: id });
            res.status(200).json({ status: "success", data: result, likeEmail });
        } else {
            // User has already liked the discussion, so we decrement the like count
            const result = await DiscussionModel.findOneAndUpdate(
                { _id: id },
                { $inc: { "likes": -1 } },
                { new: true }
            );

            const likeEmail = await LikesModel.deleteOne({ userId: email, discussionId: id });
            res.status(400).json({ status: "fail", message: "Like removed", data: result, likeEmail });
        }
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};


exports.isLikedOnDiscussion = async (req, res) => {
    try {
        const id = req.params.id
        const email = req.params.email
        const find = await LikesModel.findOne({ userId: email, discussionId: id })
        if (find) {
            res.status(200).json({ status: "success", data: true });
        }
        else {
            res.status(400).json({ status: "fail", data: false });
        }
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}