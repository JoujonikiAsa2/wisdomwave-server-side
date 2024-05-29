const mongoose = require('mongoose');

// Define Institute schema
const InstituteSchema = new mongoose.Schema({
    institutes: [String]
});

// Create Institute model
const InstituteModel = mongoose.model('institutes', InstituteSchema);

module.exports = InstituteModel