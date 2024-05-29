const mongoose = require('mongoose');

// Define TutorMessage schema
const UpazilaSchema = new mongoose.Schema({
    district_id: String,
    name:  String,
    bn_name: String,
    upazila_id: String,
});

// Create TutorMessage model
const UpazilaModel = mongoose.model('upazilas', UpazilaSchema);

module.exports = UpazilaModel;

