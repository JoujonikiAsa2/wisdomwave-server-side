const mongoose = require('mongoose');

// Define TutorMessage schema
const DisctrictSchema = new mongoose.Schema({
    district_id: String,
    division_id: String,
    name:  String,
    bn_name: String,
    lat: String,
    long: String
});

// Create TutorMessage model
const DisctrictModel = mongoose.model('districts', DisctrictSchema);

module.exports = DisctrictModel;

