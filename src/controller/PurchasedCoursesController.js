const PurchasedCourseModel = require("../models/PurchasedCourseSchema")

exports.purchasedCourses = async (req, res) => {
    try {
        const email = req.params.email
        const query = {userEmail: email}
        const purchasedCourses = await PurchasedCourseModel.find(query)
        res.status(200).json({ status: "success", data: purchasedCourses })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}


// manage certificates
exports.openCerticates = async (req, res) => {
    try {
      const id = req.params.id;
      const update = {certificate: true};
      const options = { new: false };
      const result = await PurchasedCourseModel.findOneAndUpdate({courseId: id}, update, options);
      console.log(result)
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      res.status(500).json({ status: "Failed to update", message: error.message });
    }
  }
exports.closeCerticates = async (req, res) => {
    try {
      const id = req.params.id;
      const update = {certificate: false};
      const options = { new: false };
      const result = await PurchasedCourseModel.findOneAndUpdate({courseId: id}, update, options);
      console.log(result)
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      res.status(500).json({ status: "Failed to update", message: error.message });
    }
  }


  exports.searchPurchasedCourses = async (req, res) => {
    try {
      const searchValue = req.params.searchValue;
      console.log(searchValue);
      const splitedKeywords = searchValue.split(" ");
  
      // Construct an array of regex
      const regexQueries = splitedKeywords.map(keyword => new RegExp(keyword, 'i'));
  
      // Search for courses where each keyword matches part of the title
      const searchedCourses = await PurchasedCourseModel.find({
        'courseDetails.title': { $in: regexQueries }
      });
  
      res.status(200).json({ status: "success", data: searchedCourses });
    } catch (error) {
      res.status(500).json({ status: "Failed to fetch", message: error.message });
    }
  };