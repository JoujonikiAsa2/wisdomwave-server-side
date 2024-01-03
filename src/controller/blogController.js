const BlogModel = require("../models/BlogSchema");

// create a blog post
exports.BlogPost = async(req,res) =>{
    try {
        const blog = req.body
        const result = await BlogModel.create(blog) 
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message});
    }
}

// read all blogs
exports.BlogsRead = async(req,res) =>{
    try {
        const result = await BlogModel.find({}, '-__v'); 
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message});
    }
}

// read a blog by id
exports.BlogReadById = async(req,res) =>{
    try {
        const id = req.params.id
        const query = {_id: id}
        const result = await BlogModel.findOne(query); 
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message});
    }
}